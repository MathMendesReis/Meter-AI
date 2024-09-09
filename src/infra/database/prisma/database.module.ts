import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { MeasurePrismaRepositorie } from './repositories/MeasurePrisma';
import { IMeasurePrismaRepositorie } from '../../../domain/measure/application/repositories/measure-repositorie';
import { ImageRepositorie } from 'src/domain/measure/application/repositories/image-repositorie';
import { ImagePrisma } from './repositories/ImagePrisma';

@Module({
  providers: [
    PrismaService,
    { provide: IMeasurePrismaRepositorie, useClass: MeasurePrismaRepositorie },
    { provide: ImageRepositorie, useClass: ImagePrisma },
  ],
  exports: [PrismaService, IMeasurePrismaRepositorie, ImageRepositorie],
})
export class DatabaseModule {}
