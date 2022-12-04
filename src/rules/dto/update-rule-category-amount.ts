import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleCategoryAmountDto } from './create-rule-category-amount';

export class UpdateRuleCategoryAmountDto extends PartialType(CreateRuleCategoryAmountDto) {}