import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {TableTemplateService} from "./table-template.service";
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {TableTemplate} from "./table-template.entity";
import {TableColTemplate} from "./table-col-template.entity";

@Controller('table-template')
export class TableTemplateController {
  constructor(private readonly tableTemplateService: TableTemplateService) {
  }

  @Post('get-all-table-templates')
  @UseGuards(JwtAuthGuard)
  async getAllTableTemplates(@Req() req, @Body() body: {table:string}): Promise<TableTemplate[]> {
    const user_id = req.user
    return await this.tableTemplateService.getAllTableTemplates(
      user_id,
      body.table,
    );
  }

  @Post('get-table-template')
  @UseGuards(JwtAuthGuard)
  async getTableTemplate(@Body() body: {id:number}): Promise<TableTemplate> {
    console.log('heer',body)
    return await this.tableTemplateService.getTableTemplate(body.id);
  }

  @Post('add-table-template')
  @UseGuards(JwtAuthGuard)
  async addTableTemplate(@Req() req, @Body() body: TableTemplate): Promise<TableTemplate> {
    const user_id = req.user
    return await this.tableTemplateService.addTableTemplate(user_id, body);
  }

  @Post('update-table-template')
  @UseGuards(JwtAuthGuard)
  async updateTableTemplate(@Req() req, @Body() body: TableTemplate): Promise<TableTemplate> {
    const user_id = req.user
    return await this.tableTemplateService.updateTableTemplate(user_id, body);
  }

  @Post('update-table-column-template-data')
  @UseGuards(JwtAuthGuard)
  async updateTableColumnTemplate(@Req() req, @Body() body: TableColTemplate): Promise<TableColTemplate> {
    return await this.tableTemplateService.updateTableColumnTemplate(body);
  }

  @Post('delete-table-template')
  @UseGuards(JwtAuthGuard)
  async deleteTableTemplate(@Body() body: {id:number}): Promise<Message> {
    return await this.tableTemplateService.deleteTableTemplate(body.id);
  }
}
