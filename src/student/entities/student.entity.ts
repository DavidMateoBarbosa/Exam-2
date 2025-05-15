import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "../../project/entities/project.entity";

@Entity("Students")
export class StudentEntity {
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
    name: "Major"
  })
  major: string;

  @Column({
    name: "Semester",
    type: "int"
  })
  semester: number;

  @Column({
    name: "Average",
    type: "float"
  })
  average: number;

  @OneToMany((): typeof ProjectEntity => ProjectEntity, (project: ProjectEntity): StudentEntity => project.leader)
  projects: ProjectEntity[];
}
