import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServicesService } from '../services.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private calendarService: ServicesService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
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
      const base64Url = token.split('.')[1]; // Get payload part of the JWT token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64Url to Base64
      const payload = JSON.parse(window.atob(base64)); // Decode Base64 and parse JSON

      console.log(payload.roles[0].value);
      if (payload.roles[0].value === 'admin') {
        this.calendarService.createCalendarItem(this.form.value).subscribe();
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
