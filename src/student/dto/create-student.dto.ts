import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateStudentDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    document: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    program: string;

    @Min(1)
    @IsInt()
    @IsNotEmpty()
    semester: number;

    @IsNumber()
    @IsNotEmpty()
    average: number;

    @IsArray()
    @IsString({
        each: true
    })
    @IsOptional()
    projects?: string[];
}