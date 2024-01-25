import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServicesService } from '../services.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
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
    private cookieService: CookieService,
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
    this.http
      .post('http://localhost:1268/calendar', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(() => {
        this.router.navigate(['/calendar']);
      });
  }

  // set this shit in service or whatever
  isAdmin(): boolean {
    const token = this.cookieService.get('token');
    if (!token) return false;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role === 'admin';
  }

  onAddButtonClick(): void {
    this.isAddButtonClicked = true;
  }

  onCloseButtonClick(): void {
    this.isAddButtonClicked = false;
  }
}
