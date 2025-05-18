import {IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProfessorDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    document: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsInt()
    @IsNotEmpty()
    extension: number;

    @IsBoolean()
    @IsOptional()
    peer?: boolean;

    @IsArray()
    @IsString({
        each: true
    })
    @IsOptional()
    evaluations?: string[];


    @IsArray()
    @IsString({
        each: true
    })
    @IsOptional()
    mentorships?: string[];
}
