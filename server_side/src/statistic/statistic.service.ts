import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SaveStatisticDto} from "./dto/save-statistic.dto";
import {Statistic, StatisticAccessForUsers} from "./statistic.entity";
import {User} from "../user/user.entity";

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private integrationStatisticRepository: Repository<Statistic>,
    @InjectRepository(StatisticAccessForUsers)
    private statisticAccessForUsersRepository: Repository<StatisticAccessForUsers>,
  ) {
  }

  async getStatistics(user_id: number): Promise<Statistic[]> {
    const user = new User();
    user.id = user_id
    const own_statistics = await this.integrationStatisticRepository.find({
      where: {
        user: user,
      },
      relations: ['user']
    })
    const accessForUsers = await this.statisticAccessForUsersRepository.find({
      where: {
        user: user,
      },
      relations: ['statistic', 'statistic.user']
    })
    const access_statistics = accessForUsers.map(el => el.statistic)
    return [...own_statistics, ...access_statistics]
  }

  async saveStatistic(user_id: number, data: SaveStatisticDto): Promise< Message > {
    const user = new User();
    user.id = user_id
    data.user = user
    await this.integrationStatisticRepository.save(data)
    return {
      type: 'success',
      message: 'Данные успешные сохранены'
    }
  }


}
