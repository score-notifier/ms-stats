import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { StatsService } from './stats.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateTeamStatsDto } from './dto';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('stats.update.team')
  async updateTeamStats(
    @Payload() updateTeamStatsDtoList: UpdateTeamStatsDto[],
  ) {
    return this.statsService.updateTeamStats(updateTeamStatsDtoList);
  }

  @MessagePattern('stats.team')
  async getTeamStats(@Payload('teamId', ParseUUIDPipe) teamId: string) {
    return this.statsService.getTeamStats(teamId);
  }

  @MessagePattern('stats.league.standings')
  async getLeagueStandings(
    @Payload('leagueId', ParseUUIDPipe) leagueId: string,
  ) {
    return this.statsService.getLeagueStandings(leagueId);
  }
}
