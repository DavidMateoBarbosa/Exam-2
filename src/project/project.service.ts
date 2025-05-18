import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from "typeorm";
import { StudentEntity } from '../student/entities/student.entity';
import { ProfessorEntity } from "../professor/entities/professor.entity";
import { EvaluationEntity } from "../evaluation/entities/evaluation.entity";
import { StudentService } from '../student/student.service';
import { ProfessorService } from '../professor/professor.service';
import { EvaluationService } from '../evaluation/evaluation.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    @Inject(forwardRef((): typeof StudentService => StudentService))
    private readonly studentService: StudentService,

    @Inject(forwardRef((): typeof ProfessorService => ProfessorService))
    private readonly professorService: ProfessorService,

    @Inject(forwardRef((): typeof EvaluationService => EvaluationService))
    private readonly evaluationService: EvaluationService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    if (!createProjectDto.budget || createProjectDto.budget <= 0)
      throw new BadRequestException('Budget must be greater than 0');
    if (!createProjectDto.title || createProjectDto.title.length <= 15)
      throw new BadRequestException('Title must be longer than 15 characters');
    const leader: StudentEntity = await this.studentService.findOne(createProjectDto.leader);
    let mentor: ProfessorEntity | undefined;
    if (createProjectDto.mentor)
      mentor = await this.professorService.findOne(createProjectDto.mentor);
    const project: ProjectEntity = await this.projectRepository.save(
        this.projectRepository.create({
          title: createProjectDto.title,
          area: createProjectDto.area,
          budget: createProjectDto.budget,
          grade: createProjectDto.grade,
          status: createProjectDto.status ?? 0,
          start: createProjectDto.start ? new Date(createProjectDto.start) : new Date(),
          end: createProjectDto.end ? new Date(createProjectDto.end) : undefined,
          leader,
          mentor,
        })
    );
    if (createProjectDto.evaluations?.length) {
      const evaluations: EvaluationEntity[] = (await this.evaluationService.findAll()).filter(
          (evaluation: EvaluationEntity): boolean => createProjectDto.evaluations?.includes(evaluation.id) || false
      );
      if (evaluations.length !== createProjectDto.evaluations.length)
        throw new NotFoundException('Some evaluations were not found');
      for (const evaluation of evaluations) {
        if (evaluation.evaluator?.id === leader.id)
          throw new BadRequestException('Evaluation cannot be assigned to the project leader');
        await this.evaluationService.update(evaluation.id, {
          project: project.id,
        });
      }
    }
    return await this.findOne(project.id);
  }

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find({
      relations: ['leader', 'mentor', 'evaluations'],
    });
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['leader', 'mentor', 'evaluations'],
    });
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    const project: ProjectEntity = await this.findOne(id);
    Object.assign(project, {
      title: updateProjectDto.title ?? project.title,
      area: updateProjectDto.area ?? project.area,
      budget: updateProjectDto.budget ?? project.budget,
      grade: updateProjectDto.grade ?? project.grade,
      status: updateProjectDto.status ?? project.status,
      start: updateProjectDto.start ? new Date(updateProjectDto.start) : project.start,
      end: updateProjectDto.end ? new Date(updateProjectDto.end) : project.end,
    });
    return await this.projectRepository.save(project);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.projectRepository.delete(id);
  }

  async crearProyecto(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return await this.create(createProjectDto);
  }

  async avanzarProyecto(id: string): Promise<ProjectEntity> {
    const project: ProjectEntity | null = await this.projectRepository.findOne({
      where: { id },
    });
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);
    if (project.status === 4)
      throw new BadRequestException('Project is already in its maximum state (4)');
    project.status += 1;
    return await this.projectRepository.save(project);
  }

  async findAllEstudiantes(id: string): Promise<StudentEntity[]> {
    const project: ProjectEntity = await this.findOne(id);
    if (!project.leader)
      return [];
    return [await this.studentService.findOne(project.leader.id)];
  }
}
