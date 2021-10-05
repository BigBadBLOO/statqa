import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {StatisticService} from "./statistic.service";
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {SaveStatisticDto} from "./dto/save-statistic.dto";

@Controller('statistic')
export class StatisticController {
  constructor(private readonly integrationStatisticService: StatisticService) {
  }
  @Post('save-statistic')
  @UseGuards(JwtAuthGuard)
  async setCabinetInfo(@Body() body: SaveStatisticDto): Promise<Message> {
    return await this.integrationStatisticService.saveStatistic(body);
  }
}
