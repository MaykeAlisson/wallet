import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { CreateAssertDto } from './create-assert.dto';

export class UpdateAssertDto extends PartialType(CreateAssertDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  averagePrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  investedAmount?: number;
}
