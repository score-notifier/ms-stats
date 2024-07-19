import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { UpdateTeamStatsDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StatsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(StatsService.name);

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async getLeagueStandings(leagueId: string) {
    this.logger.log('Getting league standings', { leagueId });

    const leagueExists = await this.checkLeagueExists(leagueId);

    if (!leagueExists) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'League not found',
      });
    }

    return this.teamStats.findMany({
      where: { leagueId },
    });
  }

  async updateTeamStats(updateTeamStatsDtoList: UpdateTeamStatsDto[]) {
    this.logger.log('Updating team stats', { updateTeamStatsDtoList });

    for (const updateTeamStatsDto of updateTeamStatsDtoList) {
      const { teamName, leagueId, ...stats } = updateTeamStatsDto;

      const team = await this.getTeamByName(teamName);

      if (!team) {
        this.logger.warn('Team does not exist', {
          teamName,
        });

        continue;
      }

      await this.teamStats.upsert({
        where: {
          teamId_leagueId: {
            teamId: team.id,
            leagueId,
          },
        },
        update: {
          ...stats,
        },
        create: {
          teamId: team.id,
          leagueId,
          ...stats,
        },
      });
    }
  }

  async getTeamStats(teamId: string) {
    this.logger.log('Getting team stats', { teamId });

    const teamExists = await this.checkTeamExists(teamId);

    if (!teamExists) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Team not found',
      });
    }

    return this.teamStats.findFirst({
      where: { teamId },
    });
  }

  private async getTeamByName(teamName: string) {
    return await firstValueFrom(
      this.client.send('competitions.team', { teamName }),
    );
  }

  private async checkTeamExists(teamId: string): Promise<boolean> {
    const result = await firstValueFrom(
      this.client.send('competitions.team.exists', { teamId }),
    );
    return result.exists;
  }

  private async checkLeagueExists(leagueId: string): Promise<boolean> {
    const result = await firstValueFrom(
      this.client.send('competitions.league.exists', { leagueId }),
    );
    return result.exists;
  }
}
