import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  max_pecent_assert: number;
}
