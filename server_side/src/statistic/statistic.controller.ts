import {Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {StatisticService} from "./statistic.service";
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {SaveStatisticDto} from "./dto/save-statistic.dto";
import {Statistic} from "./statistic.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

const fs = require('fs')

@Controller('statistic')
export class StatisticController {
  constructor(private readonly integrationStatisticService: StatisticService) {

  }

  @Get('get-statistics')
  @UseGuards(JwtAuthGuard)
  async getStatistics(@Req() req, @Body() body: SaveStatisticDto): Promise<Statistic[]> {
    const user_id = req.user
    return await this.integrationStatisticService.getStatistics(user_id);
  }

  @Post('change-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',  {
    storage: diskStorage({
      destination: "./uploads/statistic-avatar",
      filename: (req: any, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
        const user_id = req.user;
        const date = new Date();
        callback(null, `avatar_${user_id}_${date.getTime()}_${file.originalname}`)
      }
    })
  }))
  async changeAvatar(@Req() req, @Body() body: {id: number, file?: string}, @UploadedFile() file: Express.Multer.File): Promise<Message> {
    const user_id = req.user

    const statistic = await this.integrationStatisticService.getStatisticById(body.id)
    if(body.file === 'null'){
      try {
        fs.unlinkSync(`${process.cwd()}/uploads/statistic-avatar/${statistic.avatar}`)
      } catch(err) {}
      statistic.avatar = null
    }

    if(file && file.filename) {
      try {
        fs.unlinkSync(`${process.cwd()}/uploads/statistic-avatar/${statistic.avatar}`)
      } catch(err) {}
      statistic.avatar = file.filename
    }
    return await this.integrationStatisticService.saveStatistic(user_id, statistic);
  }

  @Post('save-statistic')
  @UseGuards(JwtAuthGuard)
  async saveStatistic(@Req() req, @Body() body: Statistic): Promise<Message> {
    const user_id = req.user
    return await this.integrationStatisticService.saveStatistic(user_id, body);
  }

  @Post('work-with-statistics-archive')
  @UseGuards(JwtAuthGuard)
  async workWithStatisticsArchive(@Body() body: {[key: number]: boolean}): Promise<Message> {
    return await this.integrationStatisticService.workWithStatisticsArchive(body);
  }

  @Post('delete-statistics')
  @UseGuards(JwtAuthGuard)
  async deleteStatistics(@Body() body: number[]): Promise<Message> {
    return await this.integrationStatisticService.deleteStatistics(body);
  }

  @Get('avatar/:imageName')
  async findStatisticName(@Param('imageName') imageName, @Res() res): Promise<object>{
    return res.sendfile(`${process.cwd()}/uploads/statistic-avatar/${imageName}`)
  }
}
