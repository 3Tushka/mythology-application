import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleInterface } from './interfaces/article.interface';
import { CalendarDetailsInterface } from './calendar-details/calendar-details.interface';

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

  deleteArticle(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:1268/articles/' + id);
  }

  update(id: number, updateDTO: ArticleInterface): Observable<any> {
    const url = `http://localhost:1268/articles/${id}`;
    return this.httpClient.put(url, updateDTO);
  }

  updateCalendar(
    id: number,
    updateDTO: CalendarDetailsInterface,
  ): Observable<any> {
    const url = `http://localhost:1268/calendar/${id}`;
    return this.httpClient.put(url, updateDTO);
  }

  deleteCalendar(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:1268/calendar/' + id);
  }

  getCalendar() {
    return this.httpClient.get('http://localhost:1268/calendar');
  }

  getCalendarDetails(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/calendar/' + id);
  }

  getCommentById(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/articles/' + id);
  }
}
