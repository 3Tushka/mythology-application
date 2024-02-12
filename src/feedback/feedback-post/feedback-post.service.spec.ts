import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackPostService } from '../feedback.service';

describe('FeedbackPostService', () => {
  let service: FeedbackPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackPostService],
    }).compile();

    service = module.get<FeedbackPostService>(FeedbackPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
