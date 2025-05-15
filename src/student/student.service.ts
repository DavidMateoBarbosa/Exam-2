import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "./entities/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async crearEstudiante(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    return await this.create(createStudentDto);
  }

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    if (createStudentDto.average <= 3.2)
      throw new Error("Student average is less than 3.2");
    if (createStudentDto.semester < 4)
      throw new Error("Student semester is less than 4");
    return this.studentRepository.save(createStudentDto);
  }

  findAll() {
    return `This action returns all student`;
  }

  async findOne(id: number): Promise<StudentEntity> {
    const student: StudentEntity | null = await this.studentRepository.findOne({
      where: { id },
      relations: ["projects"]
    })
    if (!student)
      throw new Error("Student not found");
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async eliminarEstudiante(id: number) {
    await this.remove(id);
  }

  async remove(id: number) {
    const student: StudentEntity = await this.findOne(id);

    // Check that all projects' end dates are before today
    const hasActiveProjects = student.projects.some(project => {
      const today = new Date();
      const projectEndDate = new Date(project.end); // Assuming 'endDate' exists in ProjectEntity
      return projectEndDate >= today;
    });

    if (hasActiveProjects) {
      throw new Error(`Cannot remove student with ID #${id} because they have ongoing projects.`);
    }

    // Remove the student if all checks pass
    await this.studentRepository.remove(student);
  }
}
