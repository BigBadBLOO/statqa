import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserModule} from "./user/user.module";
import {IntegrationAppModule} from './integration-app/integration-app.module';
import {IntegrationUserModule} from './integrtion-user/integration-user.module';
import {IntegrationCabinetModule} from './integrtion-cabinet/integration-cabinet.module';
import {StatisticModule} from './statistic/statistic.module';
import {NotificationsModule} from "./notifications/notifications.module";
import config from "../config/config";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    UserModule,
    IntegrationAppModule,
    IntegrationUserModule,
    IntegrationCabinetModule,
    StatisticModule,
    NotificationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
