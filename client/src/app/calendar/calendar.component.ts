import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServicesService } from '../services.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendar$!: Observable<any>;
  form!: FormGroup;

  jwtHelper = new JwtHelperService();

  isAddButtonClicked = false;
  isFormVisible = true; // Assuming you have this flag to control the form visibility

  monthArray = [
    'Грудень',
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
  ];

  constructor(
    private calendarService: ServicesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.calendar$ = this.calendarService.getCalendar();

    this.form = this.fb.group({
      id: '',
      day: '',
      month: '',
      title: '',
      content: '',
    });
  }

  submit(): void {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      console.log(payload.roles[0].value);
      if (payload.roles[0].value === 'admin') {
        this.calendarService
          .createCalendarItem(this.form.value)
          .subscribe(() => {
            this.isFormVisible = false; // Hide the form after submission
          });
        console.log(this.form.value);
      } else {
        (this as any).isAdmin = false;
      }
    }
  }

  onAddButtonClick(): void {
    this.isAddButtonClicked = true;
  }

  onCloseButtonClick(): void {
    this.isAddButtonClicked = false;
  }
}
