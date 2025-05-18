import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult } from "typeorm";
import { StudentEntity } from "./entities/student.entity";

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto
  ): Promise<StudentEntity> {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<StudentEntity[]> {
    return await this.studentService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<StudentEntity> {
    return await this.studentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<StudentEntity> {
    return await this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DeleteResult> {
    return await this.studentService.remove(id);
  }

  @Post()
  async crearEstudiante(
    @Body() createStudentDto: CreateStudentDto
  ): Promise<StudentEntity> {
    return await this.studentService.crearEstudiante(createStudentDto);
  }

  @Delete(':id')
  async eliminarEstudiante(
    @Param('id') id: string
  ): Promise<DeleteResult> {
    return await this.studentService.eliminarEstudiante(id);
  }
}
