import { ValidationArguments, ValidatorConstraintInterface } from "class-validator"

export class ValidatorUniqueEmail implements ValidatorConstraintInterface {

    constructor(private userRepository: any){}

   async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
   
}