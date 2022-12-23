import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Category } from 'src/rules/enum/rules-category.enum';
import { Coin } from 'src/rules/enum/rules-coin.enum';
import { Type } from 'src/rules/enum/rules-type.enum';

export class CreateAssertDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsEnum(Type)
  type: string;

  @IsEnum(Coin)
  coin: string;

  @IsEnum(Category)
  category: string;
}
