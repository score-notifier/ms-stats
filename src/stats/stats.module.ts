import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [NatsModule],
})
export class StatsModule {}
