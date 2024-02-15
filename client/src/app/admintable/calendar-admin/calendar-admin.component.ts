import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.scss'],
})
export class CalendarAdminComponent implements OnInit {
  calendar: any;

  form: FormGroup;
  isAddButtonClicked = false;

  constructor(
    private readonly calendarAdminService: ServicesService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.calendarAdminService.getCalendar().subscribe((calendar) => {
      this.calendar = calendar;
    });

    this.form = this.formBuilder.group({
      id: '',
      day: '',
      month: '',
      title: '',
      content: '',
    });
  }

  submit(): void {
    this.calendarAdminService.createCalendarItem(this.form.value).subscribe();
  }

  onAddButtonClick(): void {
    this.isAddButtonClicked = true;
  }

  onCloseButtonClick(): void {
    this.isAddButtonClicked = false;
  }
}
