import {
  Body,
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateCalendarDto } from './dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  createCalendarItem(@Body() dto: CreateCalendarDto) {
    return this.calendarService.createCalendarItem(dto);
  }

  @Get(':id')
  async getArticle(
    @Param('id')
    id: string,
  ) {
    return this.calendarService.getCalendarItemById(id);
  }

  @Get()
  getAll() {
    return this.calendarService.getCalendarItemsAll();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteCalendarItem(@Param('id') id: number) {
    return this.calendarService.deleteCalendarItem(+id);
  }
}
