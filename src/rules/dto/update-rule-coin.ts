import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleCoinDto } from './create-rule-coin';

export class UpdateRuleCoinDto extends PartialType(CreateRuleCoinDto) {}