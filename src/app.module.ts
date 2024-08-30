import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/prisma/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}
