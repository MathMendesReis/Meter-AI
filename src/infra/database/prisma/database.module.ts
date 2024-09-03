import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { MeasurePrismaRepositorie } from './repositories/MeasurePrisma';
import { IMeasurePrismaRepositorie } from '../../../domain/measure/application/repositories/measure-repositorie';

@Module({
  providers: [
    PrismaService,
    { provide: IMeasurePrismaRepositorie, useClass: MeasurePrismaRepositorie },
  ],
  exports: [PrismaService, IMeasurePrismaRepositorie],
})
export class DatabaseModule {}
