import { Component } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendar$!: Observable<any>;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendar$ = this.calendarService.getCalendar();
  }
}
