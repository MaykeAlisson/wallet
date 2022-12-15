import { Module } from '@nestjs/common';
import { RulesTypeService } from './rules-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RulePercentType } from './entities/rule-percent-type.entity';
import { RulePercentCategory } from './entities/rule-percent-category.entity';
import { RulePercentCoin } from './entities/rule-percente-coin';
import { RuleAmountCategory } from './entities/rule-amount-category';
import { RulesCategoryService } from './rules-category.service';
import { RulesCoinService } from './rules-coin.service';
import { RulesCategoryAmountService } from './rules-category-amount.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RulePercentType,
      RulePercentCategory,
      RulePercentCoin,
      RuleAmountCategory,
    ]),
  ],
  controllers: [],
  providers: [
    RulesTypeService,
    RulesCategoryService,
    RulesCoinService,
    RulesCategoryAmountService,
  ],
  exports: [
    RulesTypeService,
    RulesCategoryService,
    RulesCoinService,
    RulesCategoryAmountService,
  ],
})
export class RulesModule {}
