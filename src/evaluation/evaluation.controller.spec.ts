import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

describe('EvaluationController', (): void => {
  let controller: EvaluationController;
  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController],
      providers: [EvaluationService],
    }).compile();
    controller = module.get<EvaluationController>(EvaluationController);
  });
  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });
});
