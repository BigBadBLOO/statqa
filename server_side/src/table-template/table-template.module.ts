import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TableTemplateService } from './table-template.service';
import { TableTemplateController } from './table-template.controller';
import {TableTemplate} from "./table-template.entity";
import {TableColTemplate} from "./table-col-template.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TableTemplate, TableColTemplate]),
  ],
  providers: [TableTemplateService],
  controllers: [TableTemplateController]
})
export class TableTemplateModule {}
