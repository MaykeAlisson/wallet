import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { RulesModule } from 'src/rules/rules.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), RulesModule, UsersModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
