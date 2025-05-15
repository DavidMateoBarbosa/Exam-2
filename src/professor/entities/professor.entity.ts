import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "../../project/entities/project.entity";
import { EvaluationEntity } from "../../evaluations/entities/evaluation.entity";

@Entity("Professors")
export class ProfessorEntity {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "bigint"
  })
  id: number;

  @Column({
    name: "CC",
    type: "int"
  })
  cc: number;

  @Column({
    name: "Name",
  })
  name: string;

  @Column({
    name: "Department",
  })
  department: string;

  @Column({
    name: "Extension",
    type: "int"
  })
  extension: number;

  @Column({
    name: "IsPairEvaluated"
  })
  evaluated: boolean;

  @OneToMany(
    (): typeof ProjectEntity => ProjectEntity,
    (project: ProjectEntity): ProfessorEntity => project.mentor
  )
  projects: ProjectEntity[];

  @OneToMany(
    (): typeof EvaluationEntity => EvaluationEntity,
    (evaluation: EvaluationEntity): ProfessorEntity => evaluation.professor
  )
  evaluations: EvaluationEntity[];
}
