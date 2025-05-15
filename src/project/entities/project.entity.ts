import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { StudentEntity } from "../../student/entities/student.entity";
import {ProfessorEntity} from "../../professor/entities/professor.entity";
import {EvaluationEntity} from "../../evaluations/entities/evaluation.entity";

@Entity("Projects")
export class ProjectEntity {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "bigint"
  })
  id: number;

  @Column({
    name: "Title",
  })
  title: string;

  @Column({
    name: "Topic"
  })
  topic: string;

  @Column({
    name: "Budget",
    type: "float"
  })
  budget: number;

  @Column({
    name: "FinalGrade",
    type: "float"
  })
  grade: number;

  @Column({
    name: "Status",
    type: "enum",
    enum: [0, 1, 2, 3, 4]
  })
  status: 0 | 1 | 2 | 3 | 4;

  @Column({
    name: "DateStart"
  })
  start: Date;

  @Column({
    name: "DateEnd"
  })
  end: Date;

  @ManyToOne(
    (): typeof StudentEntity => StudentEntity,
    (student: StudentEntity): ProjectEntity[] => student.projects
  )
  leader: StudentEntity;

  @ManyToOne(
    (): typeof ProfessorEntity => ProfessorEntity,
    (professor: ProfessorEntity): ProjectEntity[] => professor.projects
  )
  mentor: ProfessorEntity;

  @OneToMany(
    (): typeof EvaluationEntity => EvaluationEntity,
    (evaluation: EvaluationEntity): ProjectEntity => evaluation.project
  )
  evaluations: EvaluationEntity[];
}

