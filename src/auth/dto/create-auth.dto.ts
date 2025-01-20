import { IsString, IsStrongPassword, Matches, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    name:string;
    @IsString()
    email:string;
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/ ,{message:'password must contain at least one number'})
    password:string;
}
