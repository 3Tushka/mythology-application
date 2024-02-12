import { Module, forwardRef } from '@nestjs/common';
import { FeedbackPostController } from './feedback-post.controller';
import { Feedback } from '../schema/feedback.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { FeedbackService } from '../feedback.service';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/users/user.schema';

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackPostController],
  imports: [
    SequelizeModule.forFeature([User, Feedback]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class FeedbackPostModule {}
