import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {StatisticService} from "./statistic.service";
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {SaveStatisticDto} from "./dto/save-statistic.dto";
import {Statistic} from "./statistic.entity";

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

  @Post('save-statistic')
  @UseGuards(JwtAuthGuard)
  async setCabinetInfo(@Req() req, @Body() body: SaveStatisticDto): Promise<Message> {
    const user_id = req.user
    return await this.integrationStatisticService.saveStatistic(user_id, body);
  }
}
