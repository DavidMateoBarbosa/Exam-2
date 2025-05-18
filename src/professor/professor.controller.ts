import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { DeleteResult } from "typeorm";
import { ProfessorEntity } from './entities/professor.entity';
import { EvaluationEntity } from "../evaluation/entities/evaluation.entity";

@Controller('professors')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async create(
    @Body() createProfessorDto: CreateProfessorDto
  ): Promise<ProfessorEntity> {
    return await this.professorService.create(createProfessorDto);
  }

  @Get()
  async findAll(): Promise<ProfessorEntity[]> {
    return await this.professorService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<ProfessorEntity> {
    return await this.professorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto
  ): Promise<ProfessorEntity> {
    return await this.professorService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DeleteResult> {
    return await this.professorService.remove(id);
  }

  @Post()
  async crearProfesor(
    @Body() createProfessorDto: CreateProfessorDto
  ): Promise<ProfessorEntity> {
    return await this.professorService.crearProfesor(createProfessorDto);
  }

  @Patch(':professorID/project=:projectID')
  async asignarEvaluador(
    @Param('professorID') professorID: string,
    @Param('projectID') projectID: string
  ): Promise<EvaluationEntity> {
    return await this.professorService.asignarEvaluador(professorID, projectID);
  }
}
