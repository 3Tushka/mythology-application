import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private httpClient: HttpClient) {}

  getCalendar() {
    return this.httpClient.get('http://localhost:1268/calendar');
  }
}
