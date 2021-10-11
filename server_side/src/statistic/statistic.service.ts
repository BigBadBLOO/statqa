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

  async workWithStatisticsArchive(statistics_id: {[key: number]: boolean}): Promise<Message> {
    const statistics = []
    Object.keys(statistics_id).forEach(id => {
      const statistic = new Statistic()
      statistic.id = Number(id)
      statistic.in_archive = statistics_id[id]
      statistic.date_start_in_archive =  statistic.in_archive ? new Date() : null
      statistics.push(statistic)
    })
    await this.integrationStatisticRepository.save(statistics)
    return {
      type: 'success',
      message: 'Статистики добавлены в архив'
    }
  }

  async deleteStatistics(statistics_id: number[]): Promise<Message> {
    await this.integrationStatisticRepository.delete(statistics_id)
    return {
      type: 'success',
      message: 'Статистики успешно удалены'
    }
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
