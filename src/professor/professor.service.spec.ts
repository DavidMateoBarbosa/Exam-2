import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorService } from './professor.service';
import { ProjectService } from "../project/project.service";
import { StudentService } from "../student/student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule} from "../project/project.module";
import { EvaluationModule } from "../evaluation/evaluation.module";
import { AppModule } from "../app.module";
import { ProfessorEntity } from "./entities/professor.entity";
import { EvaluationEntity } from "../evaluation/entities/evaluation.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { StudentEntity } from "../student/entities/student.entity";

describe('ProfessorService', (): void => {
  let professorService: ProfessorService;
  let projectService: ProjectService;
  let studentService: StudentService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorService],
      imports: [
        TypeOrmModule.forFeature([ProfessorEntity]),
        EvaluationModule,
        ProjectModule,
        AppModule
      ],
    }).compile();

    professorService = module.get<ProfessorService>(ProfessorService);
    projectService = module.get<ProjectService>(ProjectService);
    studentService = module.get<StudentService>(StudentService);
  });

  it('Successfully call of method `crearProfesor()`', async (): Promise<void> => {
    expect(await professorService.crearProfesor({
      document: 1001,
      name: "Professor",
      department: "CompSci",
      extension: 12345,
      peer: true
    })).toBeDefined();
  });

  it("Unsuccessful call of method `crearProfesor()` (extension length is not five)", async (): Promise<void> => {
    await expect(professorService.crearProfesor({
      document: 1001,
      name: "Professor",
      department: "CompSci",
      extension: 123456,
      peer: true
    })).rejects.toThrow("Extension must be five digits long");
  })

  it("Successfully call of method `asignarEvaluador()`", async (): Promise<void> => {
    let professor: ProfessorEntity = await professorService.crearProfesor({
      document: 1001,
      name: "Professor",
      department: "CompSci",
      extension: 12345,
      peer: true
    })

    const student: StudentEntity = await studentService.crearEstudiante({
      document: 2001,
      name: "Student A",
      program: "Ing. Sistemas",
      semester: 5,
      average: 4.0
    });

    const project: ProjectEntity = await projectService.crearProyecto({
      title: "Blockchain Revolution in Uniandes",
      area: "Software",
      budget: 10000,
      grade: 4.0,
      status: 1,
      start: "2025-05-01",
      end: "2025-05-18",
      leader: student.id
    })

    let evaluation: EvaluationEntity = await professorService.asignarEvaluador(professor.id, project.id);

    expect(evaluation).toBeDefined();
    expect(evaluation.evaluator.id).toBe(professor.id);
    expect(evaluation.project.id).toBe(project.id);
  })

  it("Unsuccessful call of method `asignarEvaluador()` (professor has three active projects)", async (): Promise<void> => {
    const professor: ProfessorEntity = await professorService.crearProfesor({
      document: 1001,
      name: "Professor",
      department: "CompSci",
      extension: 12345,
      peer: true
    });

    const student: StudentEntity = await studentService.crearEstudiante({
      document: 2001,
      name: "Student A",
      program: "Ing. Sistemas",
      semester: 5,
      average: 4.0
    });

    for (let i: number = 0; i < 3; i++) {
      await projectService.crearProyecto({
        title: `Active Project ${i}`,
        area: "Software",
        budget: 5000,
        grade: 3.5,
        status: 1,
        start: "2025-05-01",
        leader: student.id,
        mentor: professor.id
      });
    }

    const project: ProjectEntity = await projectService.crearProyecto({
      title: "Overflow Project",
      area: "AI",
      budget: 8000,
      grade: 4.2,
      status: 1,
      start: "2025-06-01",
      leader: student.id
    });

    await expect(professorService.asignarEvaluador(
      professor.id,
      project.id
    )).rejects.toThrow("Professor cannot be assigned as mentor to more than three active projects");
  });
});
