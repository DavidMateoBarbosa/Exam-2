import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { ProjectModule } from '../project/project.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [
    TypeOrmModule.forFeature([StudentEntity]),
    forwardRef(() => ProjectModule),
  ],
  exports: [StudentService],
})
export class StudentModule {}
