import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleCategoryDto } from './create-rule-category';

export class UpdateRuleCategoryDto extends PartialType(CreateRuleCategoryDto) {}
