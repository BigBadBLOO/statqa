import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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

  async getStatisticById(statistic_id: number): Promise<Statistic> {
    return await this.integrationStatisticRepository.findOne({
      where: {
        id: statistic_id,
      }
    })
  }

  async getStatistics(user_id: number): Promise<Statistic[]> {
    const user = new User();
    user.id = user_id
    const own_statistics = await this.integrationStatisticRepository.find({
      where: {
        user: user,
      },
      relations: ['user', 'campaigns', 'accessForUsers', 'accessForUsers.user']
    })
    const accessForUsers = await this.statisticAccessForUsersRepository.find({
      where: {
        user: user,
      },
      relations: ['statistic', 'statistic.user', 'statistic.campaigns', 'statistic.accessForUsers', 'statistic.accessForUsers.user']
    })
    const access_statistics = accessForUsers.map(el => el.statistic)
    return [...own_statistics, ...access_statistics]
  }

  async saveStatistic(user_id: number, data: Statistic): Promise< Message > {
    const user = new User();
    user.id = user_id
    data.user = user
    const statistic = await this.integrationStatisticRepository.save(data)
    return {
      type: 'success',
      message: 'Данные успешные сохранены',
      data: statistic.id
    }
  }
}
