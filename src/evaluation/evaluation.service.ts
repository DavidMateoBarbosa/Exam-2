import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from 'typeorm';
import { EvaluationEntity } from './entities/evaluation.entity';
import { ProfessorEntity } from "../professor/entities/professor.entity";
import { ProjectEntity } from "../project/entities/project.entity";
import { ProfessorService } from "../professor/professor.service";
import { ProjectService } from '../project/project.service';

@Injectable()
export class EvaluationService {
  constructor(
      @InjectRepository(EvaluationEntity)
      private readonly evaluationRepository: Repository<EvaluationEntity>,

      @Inject(forwardRef((): typeof ProfessorService => ProfessorService))
      private readonly professorService: ProfessorService,

      @Inject(forwardRef((): typeof ProjectService => ProjectService))
      private readonly projectService: ProjectService
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto): Promise<EvaluationEntity> {
    const evaluator: ProfessorEntity = await this.professorService.findOne(createEvaluationDto.evaluator);
    const project: ProjectEntity = await this.projectService.findOne(createEvaluationDto.project);
    if (project.mentor?.id === evaluator.id)
      throw new BadRequestException('Evaluator cannot be the same as the project mentor');
    if (project.grade != null && (project.grade < 0 || project.grade > 5))
      throw new BadRequestException('Project grade must be between 0 and 5');
    return await this.evaluationRepository.save(
        this.evaluationRepository.create({ evaluator, project })
    );
  }

  async findAll(): Promise<EvaluationEntity[]> {
    return await this.evaluationRepository.find({
      relations: ['evaluator', 'project'],
    });
  }

  async findOne(id: string): Promise<EvaluationEntity> {
    const evaluation: EvaluationEntity | null = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['evaluator', 'project'],
    });
    if (!evaluation)
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    return evaluation;
  }

  async update(id: string, updateEvaluationDto: UpdateEvaluationDto): Promise<EvaluationEntity> {
    const evaluation: EvaluationEntity = await this.findOne(id);
    if (updateEvaluationDto.project) {
      const project: ProjectEntity = await this.projectService.findOne(updateEvaluationDto.project);
      if (project.mentor?.id === evaluation.evaluator?.id)
        throw new BadRequestException('Evaluator cannot be the same as the project mentor');
      if (project.grade != null && (project.grade < 0 || project.grade > 5))
        throw new BadRequestException('Project grade must be between 0 and 5');
      evaluation.project = project;
    }
    if (updateEvaluationDto.evaluator && updateEvaluationDto.evaluator !== evaluation.evaluator?.id)
      evaluation.evaluator = await this.professorService.findOne(updateEvaluationDto.evaluator);
    return await this.evaluationRepository.save(evaluation);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.evaluationRepository.delete(id);
  }

  async crearEvaluacion(createEvaluationDto: CreateEvaluationDto): Promise<EvaluationEntity> {
    return await this.create(createEvaluationDto);
  }
}
