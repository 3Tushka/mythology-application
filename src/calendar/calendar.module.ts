import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Calendar } from './schema/calendar.schema';
import { User } from 'src/users/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CalendarService],
  controllers: [CalendarController],
  imports: [SequelizeModule.forFeature([User, Calendar]), AuthModule],
})
export class CalendarModule {}
