import {Module} from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Statistic, StatisticAccessForUsers} from "./statistic.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Statistic, StatisticAccessForUsers]),
  ],
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}
