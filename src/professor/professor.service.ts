import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from "typeorm";
import { ProfessorEntity } from './entities/professor.entity';
import { ProjectEntity } from '../project/entities/project.entity';
import { EvaluationService } from '../evaluation/evaluation.service';
import { ProjectService } from '../project/project.service';
import { EvaluationEntity } from "../evaluation/entities/evaluation.entity";

@Injectable()
export class ProfessorService {
  constructor(
      @InjectRepository(ProfessorEntity)
      private readonly professorRepository: Repository<ProfessorEntity>,

      @Inject(forwardRef((): typeof EvaluationService => EvaluationService))
      private readonly evaluationService: EvaluationService,

      @Inject(forwardRef((): typeof ProjectService => ProjectService))
      private readonly projectService: ProjectService,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<ProfessorEntity> {
    if (createProfessorDto.extension.toString().length !== 5)
      throw new BadRequestException('Extension must be five digits long');
    const evaluations: EvaluationEntity[] = createProfessorDto.evaluations ? (await this.evaluationService.findAll()).filter(
        (evaluation: EvaluationEntity): boolean => createProfessorDto.evaluations?.includes(evaluation.id) || false
    ) : [];
    const mentorships: ProjectEntity[] = createProfessorDto.mentorships ? (await Promise.all(
        createProfessorDto.mentorships.map((id: string): Promise<ProjectEntity> => this.projectService.findOne(id))
    )) : [];
    return await this.professorRepository.save({
      document: createProfessorDto.document,
      name: createProfessorDto.name,
      department: createProfessorDto.department,
      extension: createProfessorDto.extension,
      peer: createProfessorDto.peer || false,
      evaluations,
      mentorships,
    });
  }

  async findAll(): Promise<ProfessorEntity[]> {
    return await this.professorRepository.find({
      relations: ['evaluations', 'mentorships'],
    });
  }

  async findOne(id: string): Promise<ProfessorEntity> {
    const professor: ProfessorEntity | null = await this.professorRepository.findOne({
      where: { id },
      relations: ['evaluations', 'mentorships'],
    });
    if (!professor)
      throw new NotFoundException(`Professor with ID ${id} not found`);
    return professor;
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto): Promise<ProfessorEntity> {
    const professor: ProfessorEntity = await this.findOne(id);
    if (updateProfessorDto.extension && updateProfessorDto.extension.toString().length !== 5)
      throw new BadRequestException('Extension must be 5 digits');
    const evaluations: EvaluationEntity[] = updateProfessorDto.evaluations ? (await this.evaluationService.findAll()).filter(
        (evaluation: EvaluationEntity): boolean => updateProfessorDto.evaluations?.includes(evaluation.id) || false
    ) : professor.evaluations;
    const mentorships: ProjectEntity[] = updateProfessorDto.mentorships ? (await Promise.all(
        updateProfessorDto.mentorships.map((id: string): Promise<ProjectEntity> => this.projectService.findOne(id))
    )) : professor.mentorships;
    Object.assign(professor, {
      document: updateProfessorDto.document ?? professor.document,
      name: updateProfessorDto.name ?? professor.name,
      department: updateProfessorDto.department ?? professor.department,
      extension: updateProfessorDto.extension ?? professor.extension,
      peer: updateProfessorDto.peer ?? professor.peer,
      evaluations,
      mentorships,
    });
    return await this.professorRepository.save(professor);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.professorRepository.delete(id);
  }

  async crearProfesor(createProfessorDto: CreateProfessorDto): Promise<ProfessorEntity> {
    return await this.create(createProfessorDto);
  }

  async asignarEvaluador(professorID: string, projectID: string): Promise<EvaluationEntity> {
    const professor: ProfessorEntity = await this.findOne(professorID);
    const project: ProjectEntity = await this.projectService.findOne(projectID);
    if (professor.mentorships?.filter((project: ProjectEntity): boolean => !project.end).length ?? 0 >= 3)
      throw new BadRequestException('Professor cannot be assigned as mentor to more than three active projects');
    project.mentor = professor;
    await this.projectService.update(project.id, { mentor: professor.id });
    return await this.evaluationService.create({
      evaluator: professor.id,
      project: project.id,
    });
  }
}
