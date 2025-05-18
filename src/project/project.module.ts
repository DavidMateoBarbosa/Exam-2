import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { StudentModule } from '../student/student.module';
import { ProfessorModule } from '../professor/professor.module';
import { EvaluationModule } from "../evaluation/evaluation.module";

@Module({
    controllers: [ProjectController],
    providers: [ProjectService],
    imports: [
        TypeOrmModule.forFeature([ProjectEntity]),
        forwardRef((): typeof StudentModule => StudentModule),
        forwardRef((): typeof ProfessorModule => ProfessorModule),
        forwardRef((): typeof EvaluationModule => EvaluationModule),
    ],
    exports: [ProjectService],
})
export class ProjectModule {}
