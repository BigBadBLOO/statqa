import { Module } from '@nestjs/common';
import { StatisticRowController } from './statistic-row.controller';
import { StatisticRowService } from './statistic-row.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StatisticRow} from "./statistic-row.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StatisticRow]),
  ],
  controllers: [StatisticRowController],
  providers: [StatisticRowService]
})
export class StatisticRowModule {}
