import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { IntegrationUserService } from './integration-user.service';
import { IntegrationUserController } from './integration-user.controller';
import {IntegrationUser} from "./integration-user.entity";
import {IntegrationApp} from "../integration-app/integration-app.entity";
import {IntegrationCabinet} from "../integrtion-cabinet/integration-cabinet.entity";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([IntegrationUser, IntegrationApp, IntegrationCabinet]),
  ],
  providers: [IntegrationUserService],
  controllers: [IntegrationUserController]
})
export class IntegrationUserModule {}
