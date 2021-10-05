import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {IntegrationCabinetService} from "./integration-cabinet.service";
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {IntegrationCabinet} from "./integration-cabinet.entity";

@Controller('integration-cabinet')
export class IntegrationCabinetController {
  constructor(private readonly integrationCabinetService: IntegrationCabinetService) {
  }

  @Post('set-cabinet-info')
  @UseGuards(JwtAuthGuard)
  async setCabinetInfo(
      @Body() body: { cabinet_id: number, factor: number, access_get_statistic: boolean }
  ): Promise<IntegrationCabinet> {
    return await this.integrationCabinetService.setCabinetInfo(body);
  }

  @Post('get-integration-cabinets-from-FB')
  @UseGuards(JwtAuthGuard)
  async getIntegrationCabinetsFromFB(@Req() req, @Body() body: { account_id: number }): Promise<IntegrationCabinet[] | Message> {
    const account_id = body.account_id
    return await this.integrationCabinetService.getCabinetsFromFB(account_id);
  }

  @Post('save-integration-cabinets-from-FB')
  @UseGuards(JwtAuthGuard)
  async saveIntegrationCabinetsFromFB(
    @Body() body: { account_id: number, cabinets: IntegrationCabinet[] }
  ): Promise<IntegrationCabinet[] | Message> {
    const account_id = body.account_id
    const cabinets = body.cabinets
    return await this.integrationCabinetService.saveCabinetsFromFB(account_id, cabinets);
  }

  @Get('get-campaigns-name')
  @UseGuards(JwtAuthGuard)
  async getCampaignsName(@Req() req): Promise<object[]> {
    const user_id = req.user
    return await this.integrationCabinetService.getCampaignsName(user_id);
  }
}
