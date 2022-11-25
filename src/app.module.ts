import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { validateEnvironmentVariables } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './database/data-source';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true
    }),
    TypeOrmModule.forRoot(OrmConfig),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
