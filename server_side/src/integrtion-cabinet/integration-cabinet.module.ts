import { Module } from '@nestjs/common';
import { IntegrationCabinetService } from './integration-cabinet.service';
import { IntegrationCabinetController } from './integration-cabinet.controller';

@Module({
  providers: [IntegrationCabinetService],
  controllers: [IntegrationCabinetController]
})
export class IntegrationCabinetModule {}
