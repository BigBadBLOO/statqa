import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {User} from "../user/user.entity";
import {IntegrationAppService} from "./integration-app.service";
import {IntegrationApp} from "./integration-app.entity";

@Controller('integration-app')
export class IntegrationAppController {
  constructor(private readonly appService: IntegrationAppService) {}

  @Get('get-all-apps')
  @UseGuards(JwtAuthGuard)
  async getAllApps(): Promise<IntegrationApp[]> {
    return await this.appService.getAllApps();
  }
}
