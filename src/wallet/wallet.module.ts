import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { RulesModule } from '../rules/rules.module';
import { UsersModule } from '../users/users.module';
import { Assert } from 'src/asserts/entities/assert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, Assert]),
    RulesModule,
    UsersModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
