import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { ProjectService } from "../project/project.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "../project/project.module";
import { AppModule } from "../app.module";
import { StudentEntity } from "./entities/student.entity";
import { DeleteResult } from "typeorm";

describe('StudentService', (): void => {
  let studentService: StudentService;
  let projectService: ProjectService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
      imports: [
        TypeOrmModule.forFeature([StudentEntity]),
        ProjectModule,
        AppModule
      ]
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    projectService = module.get<ProjectService>(ProjectService);
  });

  it('Successfully call of method `crearEstudiante()`', async (): Promise<void> => {
    const student: StudentEntity = await studentService.crearEstudiante({
      document: 12345,
      name: "Student Success",
      program: "Systems Engineering",
      semester: 5,
      average: 4.0
    });
    expect(student).toBeDefined();
  });

  it('Unsuccessfully call of method `crearEstudiante()` (average is less equal than 3.2)', async (): Promise<void> => {
    await expect(studentService.crearEstudiante({
      document: 12346,
      name: "Low Average Student",
      program: "Systems Engineering",
      semester: 5,
      average: 3.2
    })).rejects.toThrow("Average must be greater than 3.2");
  });

  it('Unsuccessfully call of method `crearEstudiante()` (average is less than 4)', async (): Promise<void> => {
    await expect(studentService.crearEstudiante({
      document: 12347,
      name: "Early Semester Student",
      program: "Systems Engineering",
      semester: 3,
      average: 4.0
    })).rejects.toThrow("Semester must be greater or equal to 4");
  });

  it("Successfully call of method `eliminarEstudiante()`", async (): Promise<void> => {
    const student: StudentEntity = await studentService.crearEstudiante({
      document: 3001,
      name: "Graduated Student",
      program: "Engineering",
      semester: 8,
      average: 4.5
    });

    const result: DeleteResult = await studentService.eliminarEstudiante(student.id);

    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });

  it("Unsuccessfully call of method `eliminarEstudiante()` (student has an unfinished project)", async (): Promise<void> => {
    const student = await studentService.crearEstudiante({
      document: 3002,
      name: "Busy Student",
      program: "Computer Science",
      semester: 7,
      average: 4.3
    });

    await projectService.crearProyecto({
      title: "Unfinished Project",
      area: "Software",
      budget: 9000,
      grade: 4.0,
      status: 1,
      start: "2025-06-01",
      leader: student.id
    });

    await expect(studentService.eliminarEstudiante(
        student.id)
    ).rejects.toThrow("Student cannot be deleted because they have active (unfinished) projects");
  });

});
