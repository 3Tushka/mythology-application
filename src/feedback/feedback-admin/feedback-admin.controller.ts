import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from '../feedback.service';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('admin-table/feedback-admin')
export class FeedbackAdminController {
  constructor(private feedbackMessageAdminService: FeedbackService) {}

  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get()
  getAllFeedbackMessages() {
    return this.feedbackMessageAdminService.getAllFeedbacks();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get(':id')
  getFeedbackMessageById(
    @Param('id')
    id: string,
  ) {
    return this.feedbackMessageAdminService.getFeedbackById(id);
  }

  //   dont forget to fix this

  @Get()
  async searchFeedbackMessages(@Query('theme') search: string) {
    return this.feedbackMessageAdminService.searchFeedbacks(search);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post(':id')
  markFeedbackMessageAsFixed(@Param('id') id: string) {
    return this.feedbackMessageAdminService.markFeedbackAsFixed(id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteFeedbackMessage(@Param('id') id: string) {
    return this.feedbackMessageAdminService.deleteFeedbackById(id);
  }
}
