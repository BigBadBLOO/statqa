import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../user/auth/jwt-auth.guard";
import {IntegrationUserService} from "./integration-user.service";
import {IntegrationUser} from "./integration-user.entity";

//dto
import {DeleteUsersAndCabinetsDto} from "./dto/delete-users-and-cabinets.dto";

@Controller('integration-user')
export class IntegrationUserController {
  constructor(private readonly integrationUserService: IntegrationUserService) {}

  @Get('get-integration-users')
  @UseGuards(JwtAuthGuard)
  async getIntegrationUsers(@Req() req): Promise<IntegrationUser[]> {
    const user_id = req.user
    return await this.integrationUserService.getIntegrationUsers(user_id);
  }

  @Post('get-status-accounts')
  @UseGuards(JwtAuthGuard)
  async getStatusAccounts(@Body() body: number[]): Promise<{ [key: number]: boolean }> {
    return await this.integrationUserService.getStatusAccounts(body);
  }

  @Post('login-FB')
  @UseGuards(JwtAuthGuard)
  async loginFB(@Req() req, @Body() body: { token:string }): Promise<IntegrationUser | Message> {
    const user_id: number = req.user
    return await this.integrationUserService.loginFB(user_id, body.token);
  }

  @Post('delete-users-and-cabinets')
  @UseGuards(JwtAuthGuard)
  async deleteUsersAndCabinets(@Req() req, @Body() body: DeleteUsersAndCabinetsDto[]): Promise<Message> {
    return await this.integrationUserService.deleteUserAndCabinet(body);
  }
}
