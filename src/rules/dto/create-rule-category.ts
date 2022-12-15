import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { Category } from '../enum/rules-category.enum';

export class CreateRuleCategoryDto {
  @IsEnum(Category)
  category: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  percent: number;
}
