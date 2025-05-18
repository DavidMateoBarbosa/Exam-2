import { IsNotEmpty, IsString } from "class-validator";

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  evaluator: string;

  @IsString()
  @IsNotEmpty()
  project: string;
}
