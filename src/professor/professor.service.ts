import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import {ProfessorEntity} from "./entities/professor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepository: Repository<ProfessorEntity>,
  ) {}

  async crearProfesor(createProfessorDto: CreateProfessorDto) {
    return await this.create(createProfessorDto);
  }

  async create(createProfessorDto: CreateProfessorDto): Promise<ProfessorEntity> {
    if (("" + createProfessorDto.extension).length !== 5)
      throw new Error("Professor extension is not valid");
    return await this.professorRepository.save(createProfessorDto);
  }

  async findAll() {
    return `This action returns all professor`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} professor`;
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professor`;
  }

  async remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
