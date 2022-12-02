import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { validateEnvironmentVariables } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './database/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true
    }),
    TypeOrmModule.forRoot(OrmConfig),
    UsersModule,
    AuthModule,
    WalletModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
