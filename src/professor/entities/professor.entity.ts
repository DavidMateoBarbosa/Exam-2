import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EvaluationEntity } from "../../evaluation/entities/evaluation.entity";
import { ProjectEntity } from "../../project/entities/project.entity";

@Entity("Professors")
export class ProfessorEntity {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "bigint"
  })
  id: string;

  @Column({
    name: "Document",
    type: "int"
  })
  document: number;

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
    type: "int",
  })
  extension: number;

  @Column({
    name: "IsPeerEvaluator",
  })
  peer: boolean;

  @OneToMany(
    (): typeof EvaluationEntity => EvaluationEntity,
    (evaluation: EvaluationEntity): ProfessorEntity => evaluation.evaluator
  )
  evaluations: EvaluationEntity[];

  @OneToMany(
    (): typeof ProjectEntity => ProjectEntity,
    (project: ProjectEntity): ProfessorEntity => project.mentor!
  )
  mentorships: ProjectEntity[];
}
