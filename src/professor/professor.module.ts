import { forwardRef, Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from './entities/professor.entity';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { ProjectModule } from '../project/project.module';

@Module({
  controllers: [ProfessorController],
  providers: [ProfessorService],
  imports: [
    TypeOrmModule.forFeature([ProfessorEntity]),
    forwardRef((): typeof EvaluationModule => EvaluationModule),
    forwardRef((): typeof ProjectModule => ProjectModule),
  ],
  exports: [ProfessorService],
})
export class ProfessorModule {}
