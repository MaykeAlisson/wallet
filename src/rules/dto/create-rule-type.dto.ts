import { IsEnum, IsNumber, Min, Max } from "class-validator";
import { Type } from "../enum/rules-type.enum";

export class CreateRuleTypeDto {
    @IsEnum(Type)
    type: string;

    @IsNumber()
    @Min(1)
    @Max(100)
    percent: number;
}
