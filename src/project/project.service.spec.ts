import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { StudentService } from "../student/student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentModule } from "../student/student.module";
import { ProfessorModule } from "../professor/professor.module";
import { EvaluationModule } from "../evaluation/evaluation.module";
import { AppModule } from "../app.module";
import { ProjectEntity } from './entities/project.entity';
import { StudentEntity } from '../student/entities/student.entity';


describe('ProjectService', (): void => {
  let projectService: ProjectService;
  let studentService: StudentService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
      imports: [
          TypeOrmModule.forFeature([ProjectEntity]),
          StudentModule,
          ProfessorModule,
          EvaluationModule,
          AppModule,
      ]
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    studentService = module.get<StudentService>(StudentService);
  });

  it("Successfully call of method `crearProyecto()`", async (): Promise<void> => {
    const student: StudentEntity = await studentService.crearEstudiante({
      document: 1001,
      name: "Student A",
      program: "Engineering",
      semester: 5,
      average: 4.5,
    });

    const project: ProjectEntity = await projectService.crearProyecto({
      title: "The Great AI Infrastructure Revolution",
      area: "AI",
      budget: 15000,
      grade: 4.0,
      status: 1,
      start: "2025-06-01",
      end: "2025-12-01",
      leader: student.id,
    });

    expect(project).toBeDefined();
    expect(project.title).toBe("The Great AI Infrastructure Revolution");
    expect(project.leader.id).toBe(student.id);
  });

  it("Unsuccessfully call of method `crearProyecto()` (budget is not positive)", async (): Promise<void> => {
    const student: StudentEntity = await studentService.crearEstudiante({
      document: 1002,
      name: "Student B",
      program: "Science",
      semester: 6,
      average: 4.2,
    });

    await expect(
        projectService.crearProyecto({
          title: "Valid Title With Enough Length",
          area: "BioTech",
          budget: -100,
          grade: 3.0,
          status: 0,
          start: "2025-05-01",
          end: "2025-11-30",
          leader: student.id,
        })
    ).rejects.toThrow("Budget must be greater than 0");
  });

  it("Unsuccessfully call of method `crearProyecto()` (title is no long enough)", async (): Promise<void> => {
    const student: StudentEntity = await studentService.crearEstudiante({
      document: 1003,
      name: "Student C",
      program: "Mathematics",
      semester: 4,
      average: 4.3,
    });

    await expect(
        projectService.crearProyecto({
          title: "Too Short",
          area: "Math",
          budget: 8000,
          grade: 3.8,
          status: 0,
          start: "2025-07-01",
          end: "2025-12-01",
          leader: student.id,
        })
    ).rejects.toThrow("Title must be longer than 15 characters");
  });

  it("Successfully call of method `avanzarProyecto()`", async (): Promise<void> => {
    const student: StudentEntity = await studentService.crearEstudiante({
      document: 2001,
      name: "Student A",
      program: "Engineering",
      semester: 5,
      average: 4.3,
    });

    const project: ProjectEntity = await projectService.crearProyecto({
      title: "AI Transformation Project",
      area: "AI",
      budget: 12000,
      grade: 3.8,
      status: 1,
      start: "2025-06-01",
      end: "2025-12-01",
      leader: student.id
    });

    const advanced: ProjectEntity = await projectService.avanzarProyecto(project.id);

    expect(advanced.status).toBe(project.status + 1);
  });

  it("Successfully call of method `avanzarProyecto()` (project is in its max state)", async (): Promise<void> => {
    const student = await studentService.crearEstudiante({
      document: 2002,
      name: "Student B",
      program: "Data Science",
      semester: 6,
      average: 4.6,
    });

    const project = await projectService.crearProyecto({
      title: "Maximum State Project",
      area: "Data",
      budget: 10000,
      grade: 4.0,
      status: 4, // max state
      start: "2025-01-01",
      end: "2025-06-01",
      leader: student.id
    });

    await expect(projectService.avanzarProyecto(
        project.id
    )).rejects.toThrow("Project is already in its maximum state (4)");
  });

  it("Successfully call of method `findAllEstudiantes()`", async (): Promise<void> => {
    const leader: StudentEntity = await studentService.crearEstudiante({
      document: 1001,
      name: "Leader Student",
      program: "Engineering",
      semester: 5,
      average: 4.5
    });

    const project: ProjectEntity = await projectService.crearProyecto({
      title: "Collaborative Robotics Project",
      area: "Robotics",
      budget: 15000,
      grade: 4.2,
      status: 0,
      start: "2025-05-01",
      end: "2025-12-01",
      leader: leader.id
    });

    const students: StudentEntity[] = await projectService.findAllEstudiantes(project.id);

    const ids: string[] = students.map((student: StudentEntity): string => student.id);

    expect(ids).toContain(leader.id);
    expect(students.length).toBe(1);
  })
});
