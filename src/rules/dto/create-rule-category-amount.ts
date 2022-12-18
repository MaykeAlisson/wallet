import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { Category } from '../enum/rules-category.enum';

export class CreateRuleCategoryAmountDto {
  @IsEnum(Category)
  category: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  amount: number;
}
