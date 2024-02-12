import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackPostController } from './feedback-post.controller';

describe('FeedbackPostController', () => {
  let controller: FeedbackPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackPostController],
    }).compile();

    controller = module.get<FeedbackPostController>(FeedbackPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
