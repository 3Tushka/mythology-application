import { Injectable } from '@nestjs/common';
import { Calendar } from './schema/calendar.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCalendarDto } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar) private calendarRepository: typeof Calendar,
  ) {}

  async createCalendarItem(dto: CreateCalendarDto) {
    const calendarItem = await this.calendarRepository.create({
      ...dto,
    });
    return calendarItem;
  }

  async getCalendarItemById(id: string) {
    const calendarItem = await this.calendarRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return calendarItem;
  }

  async getCalendarItemsAll() {
    const calendarItem = await this.calendarRepository.findAll({
      include: { all: true },
    });
    return calendarItem;
  }
}
