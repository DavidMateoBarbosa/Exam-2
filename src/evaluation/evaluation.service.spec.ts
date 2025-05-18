import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from './evaluation.service';
import { ProfessorService } from "../professor/professor.service";
import { ProjectService } from "../project/project.service";
import { StudentService } from "../student/student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfessorModule } from "../professor/professor.module";
import { ProjectModule } from "../project/project.module";
import { AppModule } from "../app.module";
import { EvaluationEntity } from "./entities/evaluation.entity";
import { ProfessorEntity } from "../professor/entities/professor.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { StudentEntity } from "../student/entities/student.entity";

describe('EvaluationService', (): void => {
  let evaluationService: EvaluationService;
  let professorService: ProfessorService;
  let projectService: ProjectService;
  let studentService: StudentService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationService],
      imports: [
        TypeOrmModule.forFeature([EvaluationEntity]),
        ProfessorModule,
        ProjectModule,
        AppModule,
      ]
    }).compile();

    evaluationService = module.get<EvaluationService>(EvaluationService);
    professorService = module.get<ProfessorService>(ProfessorService);
    projectService = module.get<ProjectService>(ProjectService);
    studentService = module.get<StudentService>(StudentService);
  });

  it("Successfully call of method `crearEvaluacion()`", async (): Promise<void> => {
    const mentor: ProfessorEntity = await professorService.crearProfesor({
      document: 1001,
      name: "Mentor",
      department: "CompSci",
      extension: 12345,
      peer: true
    });

    const evaluator: ProfessorEntity = await professorService.crearProfesor({
      document: 1002,
      name: "Evaluator",
      department: "CompSci",
      extension: 54321,
      peer: true
    });

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
      mentor: mentor.id,
      leader: student.id
    });

    const evaluation: EvaluationEntity = await evaluationService.crearEvaluacion({
      evaluator: evaluator.id,
      project: project.id
    });

    expect(evaluation).toBeDefined();
    expect(evaluation.evaluator.id).toBe(evaluator.id);
    expect(evaluation.project.id).toBe(project.id);
  });

  it("Unsuccessful call of method `crearEvaluacion()` (mentor is evaluator)", async (): Promise<void> => {
    const mentor: ProfessorEntity = await professorService.crearProfesor({
      document: 1001,
      name: "Mentor",
      department: "CompSci",
      extension: 12345,
      peer: true
    });

    const evaluator: ProfessorEntity = await professorService.findOne(mentor.id);

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
      mentor: mentor.id,
      leader: student.id
    });

    await expect(evaluationService.crearEvaluacion({
      evaluator: evaluator.id,
      project: project.id
    })).rejects.toThrow("Evaluator cannot be the same as the project mentor");
  })

  it ("Unsuccessful call of method `crearEvaluacion()` (grade out of bounds)", async (): Promise<void> => {
    const mentor: ProfessorEntity = await professorService.crearProfesor({
      document: 1001,
      name: "Mentor",
      department: "CompSci",
      extension: 12345,
      peer: true
    });

    const evaluator: ProfessorEntity = await professorService.crearProfesor({
      document: 1002,
      name: "Evaluator",
      department: "CompSci",
      extension: 54321,
      peer: true
    });

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
      grade: 6.0,
      status: 1,
      start: "2025-05-01",
      end: "2025-05-18",
      mentor: mentor.id,
      leader: student.id
    });

    await expect(evaluationService.crearEvaluacion({
      evaluator: evaluator.id,
      project: project.id
    })).rejects.toThrow("Project grade must be between 0 and 5");
  })
});
