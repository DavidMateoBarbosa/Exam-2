import { forwardRef, Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationEntity } from './entities/evaluation.entity';
import { ProfessorModule } from "../professor/professor.module";
import { ProjectModule } from '../project/project.module';

@Module({
  controllers: [EvaluationController],
  providers: [EvaluationService],
  imports: [
    TypeOrmModule.forFeature([EvaluationEntity]),
    forwardRef((): typeof ProfessorModule => ProfessorModule),
    forwardRef((): typeof ProjectModule => ProjectModule),
  ],
  exports: [EvaluationService],
})
export class EvaluationModule {}
