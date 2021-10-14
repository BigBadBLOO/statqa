import {HttpModule, Module} from '@nestjs/common';
import { IntegrationCabinetService } from './integration-cabinet.service';
import { IntegrationCabinetController } from './integration-cabinet.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IntegrationUser} from "../integrtion-user/integration-user.entity";
import {IntegrationApp} from "../integration-app/integration-app.entity";
import {IntegrationCabinet} from "./integration-cabinet.entity";
import {Campaign} from "../statistic/campaign.entity";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([IntegrationCabinet, IntegrationUser, IntegrationApp, Campaign]),
  ],
  providers: [IntegrationCabinetService],
  controllers: [IntegrationCabinetController]
})
export class IntegrationCabinetModule {}
