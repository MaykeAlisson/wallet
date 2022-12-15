import { IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Coin } from '../enum/rules-coin.enum';

export class CreateRuleCoinDto {
  @IsEnum(Coin)
  coin: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  percent: number;
}
