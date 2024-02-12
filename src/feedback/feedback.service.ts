import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback } from './schema/feedback.schema';
import { Repository } from 'sequelize-typescript';
import { FeedbackPostDto } from './feedback-post/dto/create.feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback) private feedbackRepository: Repository<Feedback>,
  ) {}

  async createFeedback(dto: FeedbackPostDto) {
    const feedback = await this.feedbackRepository.create({
      ...dto,
    });
    return feedback;
  }

  async getAllFeedbacks() {
    const feedback = await this.feedbackRepository.findAll();
    return feedback;
  }

  async getFeedbackById(id: string) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });
    return feedback;
  }

  async markFeedbackAsFixed(id: string) {
    const feedback = await this.feedbackRepository.findOne({ where: { id } });

    if (feedback) {
      feedback.isFixed = true;
      await feedback.save();
    }

    return feedback;
  }

  async searchFeedbacks(search: string) {
    const feedback = await this.feedbackRepository.findAll({
      where: {
        theme: search,
      },
    });
    return feedback;
  }

  async deleteFeedbackById(id: string) {
    await this.feedbackRepository.destroy({
      where: { id },
    });
    console.log('Feedback message was deleted');
  }
}
