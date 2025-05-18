import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "../../student/entities/student.entity";
import { ProfessorEntity } from "../../professor/entities/professor.entity";
import { EvaluationEntity } from "../../evaluation/entities/evaluation.entity";

@Entity("Projects")
export class ProjectEntity {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "bigint"
  })
  id: string;

  @Column({
    name: "Title"
  })
  title: string;

  @Column({
    name: "Area"
  })
  area: string;

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
    type: "int"
  })
  status: number;

  @Column({
    name: "StartDate",
  })
  start: Date;

  @Column({
    name: "EndDate",
    nullable: true,
  })
  end?: Date;

  @ManyToOne(
    (): typeof StudentEntity => StudentEntity,
    (student: StudentEntity): ProjectEntity[] => student.projects, {
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "Leader",
    referencedColumnName: "id",
    foreignKeyConstraintName: "StudentID"
  })
  leader?: StudentEntity;

  @ManyToOne(
    (): typeof ProfessorEntity => ProfessorEntity,
    (professor: ProfessorEntity): ProjectEntity[] => professor.mentorships, {
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "Mentor",
    referencedColumnName: "id",
    foreignKeyConstraintName: "ProfessorID"
  })
  mentor?: ProfessorEntity;

  @OneToMany(
    (): typeof EvaluationEntity => EvaluationEntity,
    (evaluation: EvaluationEntity): ProjectEntity => evaluation.project
  )
  evaluations: EvaluationEntity[];
}
