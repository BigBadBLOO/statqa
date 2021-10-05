import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SaveStatisticDto} from "./dto/save-statistic.dto";
import {Statistic} from "./statistic.entity";

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private integrationStatisticRepository: Repository<Statistic>,
  ) {
  }

  async saveStatistic(data: SaveStatisticDto): Promise< Message > {
    await this.integrationStatisticRepository.save(data)
    return {
      type: 'success',
      message: 'Данные успешные сохранены'
    }
  }


}
