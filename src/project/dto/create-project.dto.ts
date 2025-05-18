import { IsArray, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    area: string;

    @IsNumber({
        allowNaN: false
    })
    @IsPositive()
    @IsOptional()
    budget?: number;

    @IsNumber({
        allowNaN: false
    })
    @IsOptional()
    @Max(5)
    @Min(0)
    grade?: number;

    @IsInt()
    @IsNotEmpty()
    status: number;

    @IsDateString()
    @IsOptional()
    start?: string;

    @IsDateString()
    @IsOptional()
    end?: string;

    @IsString()
    @IsNotEmpty()
    leader: string;

    @IsString()
    @IsOptional()
    mentor?: string;

    @IsArray()
    @IsString({
        each: true
    })
    @IsOptional()
    evaluations?: string[];
}