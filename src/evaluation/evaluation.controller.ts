import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationEntity } from "./entities/evaluation.entity";
import { DeleteResult } from "typeorm";

@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async create(
    @Body() createEvaluationDto: CreateEvaluationDto
  ): Promise<EvaluationEntity> {
    return await this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  async findAll(): Promise<EvaluationEntity[]> {
    return await this.evaluationService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<EvaluationEntity> {
    return await this.evaluationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto
  ): Promise<EvaluationEntity> {
    return await this.evaluationService.update(id, updateEvaluationDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DeleteResult> {
    return await this.evaluationService.remove(id);
  }

  @Post()
  async crearEvaluacion(
    @Body() createEvaluationDto: CreateEvaluationDto
  ): Promise<EvaluationEntity> {
    return await this.evaluationService.crearEvaluacion(createEvaluationDto);
  }
}
