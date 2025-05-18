import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteResult } from "typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { StudentEntity } from "../student/entities/student.entity";

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto
  ): Promise<ProjectEntity> {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<ProjectEntity> {
    return await this.projectService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<ProjectEntity> {
    return await this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(
      @Param('id') id: string
  ): Promise<DeleteResult> {
    return await this.projectService.remove(id);
  }

  @Post()
  async crearProyecto(
    @Body() createProjectDto: CreateProjectDto
  ): Promise<ProjectEntity> {
    return await this.projectService.crearProyecto(createProjectDto);
  }

  @Patch(':id/advance')
  async avanzarProyecto(
    @Param('id') id: string
  ): Promise<ProjectEntity> {
    return await this.projectService.avanzarProyecto(id);
  }

  @Get(':id/students')
  async findAllEstudiantes(
    @Param('id') id: string
  ): Promise<StudentEntity[]> {
    return await this.projectService.findAllEstudiantes(id);
  }
}
