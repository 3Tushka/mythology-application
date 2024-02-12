import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from '../feedback.service';
import { FeedbackPostDto } from './dto/create.feedback.dto';

@Controller('feedback')
export class FeedbackPostController {
  constructor(private feedbackMessagePostService: FeedbackService) {}

  @Post()
  createFeedbackMessage(@Body() dto: FeedbackPostDto) {
    return this.feedbackMessagePostService.createFeedback(dto);
  }
}
