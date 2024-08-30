import { Module } from '@nestjs/common';
import { UploadImageController } from './controller/uploadController';
import { GeminiService } from 'src/domain/gemini/application/use-case/GeminiService';
import { DatabaseModule } from '../database/prisma/database.module';
import { PacthConfirmController } from './controller/PathConfirmController';
import { ListById } from './controller/ListById';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadImageController, PacthConfirmController, ListById],
  providers: [GeminiService],
})
export class HttpModule {}
