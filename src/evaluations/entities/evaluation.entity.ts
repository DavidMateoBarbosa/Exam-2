import { ProfessorEntity } from "../../professor/entities/professor.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "../../project/entities/project.entity";

@Entity("Evaluations")
export class EvaluationEntity {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "bigint"
  })
  id: number;

  @ManyToOne(
    (): typeof ProfessorEntity => ProfessorEntity,
    (professor: ProfessorEntity): EvaluationEntity[] => professor.evaluations
  )
  professor: ProfessorEntity;

  @ManyToOne(
    (): typeof ProjectEntity => ProjectEntity,
    (project: ProjectEntity): EvaluationEntity[] => project.evaluations
  )
  project: ProjectEntity;
}
