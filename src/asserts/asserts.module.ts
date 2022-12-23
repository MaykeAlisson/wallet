import { Module } from '@nestjs/common';
import { AssertsService } from './asserts.service';
import { AssertsController } from './asserts.controller';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assert } from './entities/assert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assert]), UsersModule, WalletModule],
  controllers: [AssertsController],
  providers: [AssertsService],
})
export class AssertsModule {}
