import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', (): void => {
  let controller: StudentController;
  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();
    controller = module.get<StudentController>(StudentController);
  });
  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });
});
