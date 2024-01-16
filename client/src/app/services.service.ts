import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { UpdateArticleDto } from '../../../src/articles/dto/update-article.dto';

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

  updateArticle(id: string, dto: UpdateArticleDto): Observable<any> {
    return this.httpClient.put('http://localhost:1268/articles/' + id, dto);
  }

  getCalendar() {
    return this.httpClient.get('http://localhost:1268/calendar');
  }

  getCalendarDetails(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/calendar/' + id);
  }
}
