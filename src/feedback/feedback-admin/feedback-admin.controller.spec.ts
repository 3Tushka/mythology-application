import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackAdminController } from './feedback-admin.controller';

describe('FeedbackAdminController', () => {
  let controller: FeedbackAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackAdminController],
    }).compile();

    controller = module.get<FeedbackAdminController>(FeedbackAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
