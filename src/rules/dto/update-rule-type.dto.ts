import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleTypeDto } from './create-rule-type.dto';

export class UpdateRuleTypeDto extends PartialType(CreateRuleTypeDto) {}
