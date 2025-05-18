import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfessorEntity } from "../../professor/entities/professor.entity";
import { ProjectEntity } from "../../project/entities/project.entity";

@Entity("Evaluations")
export class EvaluationEntity {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "bigint"
  })
  id: string;

  @ManyToOne(
    (): typeof ProfessorEntity => ProfessorEntity,
    (student: ProfessorEntity): EvaluationEntity[] => student.evaluations
  )
  @JoinColumn({
    name: "Evaluator",
    referencedColumnName: "id",
    foreignKeyConstraintName: "EvaluatorID"
  })
  evaluator: ProfessorEntity;

  @ManyToOne(
    (): typeof ProjectEntity => ProjectEntity,
    (student: ProjectEntity): EvaluationEntity[] => student.evaluations
  )
  @JoinColumn({
    name: "Project",
    referencedColumnName: "id",
    foreignKeyConstraintName: "ProjectID"
  })
  project: ProjectEntity;
}
