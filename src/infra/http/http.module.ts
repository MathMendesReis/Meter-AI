import { Module } from '@nestjs/common';
import { GeminiService } from 'src/domain/gemini/application/use-case/GeminiService';
import { DatabaseModule } from '../database/prisma/database.module';
import { ListMeasureByCustomerIdController } from './controller/list-measure-by-customer-id-controller';
import { ConfirmedValueMeasureController } from './controller/confirmed-valeu-measure-controller';
import { UploadImageController } from './controller/upload-image-controller';
import { ListMeasureByCustomerIdUseCase } from 'src/domain/measure/application/use-case/list-measure-by-customer-id-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UploadImageController,
    ConfirmedValueMeasureController,
    ListMeasureByCustomerIdController,
  ],
  providers: [GeminiService, ListMeasureByCustomerIdUseCase],
})
export class HttpModule {}
