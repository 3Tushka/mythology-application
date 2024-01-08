import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  getArticles() {
    return this.httpClient.get('http://localhost:1268/articles');
  }

  getArticleDetails(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/articles/' + id);
  }

  getCalendar() {
    return this.httpClient.get('http://localhost:1268/calendar');
  }

  getCalendarDetails(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/calendar/' + id);
  }
}
