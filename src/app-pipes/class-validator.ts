import { IsInt, IsString } from "class-validator";

export class studentSchema{
    @IsString()
    name:string;
    @IsInt()
    Age:number;
}