import { Module } from '@nestjs/common';
import { UploadImageController } from './controller/uploadImage.controller';

@Module({
  controllers: [UploadImageController],
  providers: [],
})
export class HttpModule {}
