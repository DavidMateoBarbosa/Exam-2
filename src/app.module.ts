import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentModule } from './student/student.module';
import { ProjectModule } from './project/project.module';
import { ProfessorModule } from './professor/professor.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env["DB_HOST"],
      port: 5432,
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      entities: [__dirname + "/**/entities/*.entity{.ts,.js}"],
      dropSchema: true,
      synchronize: true,
    }),
    StudentModule,
    ProjectModule,
    ProfessorModule,
    EvaluationModule,
  ]
})
export class AppModule {}
