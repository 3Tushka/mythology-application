import { Module, forwardRef } from '@nestjs/common';
import { FeedbackAdminController } from './feedback-admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/users/user.schema';
import { Feedback } from '../schema/feedback.schema';
import { FeedbackService } from '../feedback.service';

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackAdminController],
  imports: [
    SequelizeModule.forFeature([User, Feedback]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class FeedbackAdminModule {}
