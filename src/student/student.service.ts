import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from "./entities/student.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from "typeorm";
import { ProjectEntity } from "../project/entities/project.entity";
import { ProjectService } from "../project/project.service";

@Injectable()
export class StudentService {
  constructor(
      @InjectRepository(StudentEntity)
      private readonly studentRepository: Repository<StudentEntity>,

      @Inject(forwardRef((): typeof ProjectService => ProjectService))
      private readonly projectService: ProjectService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    if (createStudentDto.average <= 3.2)
      throw new BadRequestException('Average must be greater than 3.2');
    if (createStudentDto.semester < 4)
      throw new BadRequestException('Semester must be greater or equal to 4');
    let projects: ProjectEntity[] = [];
    if (createStudentDto.projects?.length) {
      projects = await Promise.all(
          createStudentDto.projects.map((id: string): Promise<ProjectEntity> => this.projectService.findOne(id))
      );
    }
    return await this.studentRepository.save({
      document: createStudentDto.document,
      name: createStudentDto.name,
      program: createStudentDto.program,
      semester: createStudentDto.semester,
      average: createStudentDto.average,
      projects: projects,
    });
  }

  async findAll(): Promise<StudentEntity[]> {
    return await this.studentRepository.find({
      relations: ['projects']
    });
  }

  async findOne(id: string): Promise<StudentEntity> {
    const student: StudentEntity | null = await this.studentRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    if (!student)
      throw new NotFoundException(`Student with ID ${id} not found`);
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentEntity> {
    const student: StudentEntity = await this.findOne(id);
    let projects: ProjectEntity[] = [];
    if (updateStudentDto.projects?.length) {
      projects = await Promise.all(
          updateStudentDto.projects.map((id: string): Promise<ProjectEntity> => this.projectService.findOne(id))
      );
    }
    Object.assign(student, {
      document: updateStudentDto.document ?? student.document,
      name: updateStudentDto.name ?? student.name,
      program: updateStudentDto.program ?? student.program,
      semester: updateStudentDto.semester ?? student.semester,
      average: updateStudentDto.average ?? student.average,
      projects: projects,
    });
    return await this.studentRepository.save(student);
  }

  async remove(id: string): Promise<DeleteResult> {
    const student: StudentEntity = await this.findOne(id);
    if (student.projects?.some(
        (project: ProjectEntity): boolean => !project.end
    ))
      throw new BadRequestException('Student cannot be deleted because they have active (unfinished) projects');
    return await this.studentRepository.delete(id);
  }

  async crearEstudiante(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    return await this.create(createStudentDto);
  }

  async eliminarEstudiante(id: string): Promise<DeleteResult> {
    return await this.remove(id);
  }
}
