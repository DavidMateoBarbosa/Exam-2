import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';

describe('ProfessorController', (): void => {
  let controller: ProfessorController;
  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [ProfessorService],
    }).compile();
    controller = module.get<ProfessorController>(ProfessorController);
  });
  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });
});
