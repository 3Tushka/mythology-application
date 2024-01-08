import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarDetailsInterface } from './calendar-details.interface';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.scss'],
})
export class CalendarDetailsComponent implements OnInit {
  id: string | undefined | null;
  calendarData: undefined | CalendarDetailsInterface;

  constructor(
    private route: ActivatedRoute,
    private readonly calendarDetailsService: ServicesService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.calendarDetailsService
          .getCalendarDetails(this.id)
          .subscribe((response) => {
            this.calendarData = response;
          });
      }
    });
  }
}
