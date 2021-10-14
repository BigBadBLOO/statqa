//core
import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

//entity
import {TableTemplate} from "./table-template.entity";
import {TableColTemplate} from "./table-col-template.entity";
import {User} from "../user/user.entity";

@Injectable()
export class TableTemplateService {
  constructor(
    @InjectRepository(TableTemplate)
    private tableTemplateRepository: Repository<TableTemplate>,
    @InjectRepository(TableColTemplate)
    private tableColTemplateRepository: Repository<TableColTemplate>,
  ) {
  }

  async getAllTableTemplates(user_id: number, table: string): Promise<TableTemplate[]> {
    const user = new User()
    user.id = user_id
    console.log(user, table)
    return this.tableTemplateRepository.find({
      where: {
        user,
        table,
      },
      relations: ['tableCols'],
    });
  }
  async getTableTemplate(id: number): Promise<TableTemplate> {
    const template = await this.tableTemplateRepository.findOne({
      where: {
        id,
      },
      relations: ['tableCols'],
    });
    template.tableCols.sort((a, b) => a.id - b.id);
    return template;
  }

  async addTableTemplate(
    user_id: number,
    data: TableTemplate,
  ): Promise<TableTemplate> {
    const user = new User()
    user.id = user_id
    return await this.tableTemplateRepository.save({ ...data, user });
  }

  async updateTableTemplate(
    user_id: number,
    data: TableTemplate,
  ): Promise<TableTemplate> {
    const user = new User()
    user.id = user_id
    await this.tableColTemplateRepository.delete(
      data.tableCols.map((el) => el.id),
    );
    return await this.tableTemplateRepository.save({ ...data, user });
  }

  async updateTableColumnTemplate(
    data: TableColTemplate,
  ): Promise<TableColTemplate> {
    return await this.tableColTemplateRepository.save(data);
  }

  async deleteTableTemplate(id: number): Promise<Message> {
    await this.tableTemplateRepository.delete(id);
    return { type: 'success', message:'Данные успешно удалены'};
  }
}
