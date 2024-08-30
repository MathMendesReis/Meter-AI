import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { MeasurePrismaRepositorie } from './repositories/MeasurePrisma';

@Module({
  providers: [PrismaService, MeasurePrismaRepositorie],
  exports: [PrismaService, MeasurePrismaRepositorie],
})
export class DatabaseModule {}
