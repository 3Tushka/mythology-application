import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Calendar } from './schema/calendar.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCalendarDto } from './dto/calendar.dto';
import { UpdateArticleDto } from 'src/articles/dto/update-article.dto';

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

  async updateCalendarItem(id: number, updateDTO: UpdateArticleDto) {
    const record = await this.calendarRepository.findOne({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    Object.assign(record, updateDTO);

    return await record.save();
  }

  async deleteCalendarItem(id: number): Promise<void> {
    await this.calendarRepository.destroy({
      where: { id },
    });
    console.log(`Calendar ${id} was  Deleted`);
  }
}
