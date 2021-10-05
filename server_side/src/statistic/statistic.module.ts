import {Module} from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Statistic} from "./statistic.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Statistic]),
  ],
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}
