import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendar$!: Observable<any>;

  constructor(private calendarService: ServicesService) {}

  ngOnInit(): void {
    this.calendar$ = this.calendarService.getCalendar();
  }
}
