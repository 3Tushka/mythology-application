import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleInterface } from './interfaces/article.interface';

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

  // updateArticle(
  //   id: string,
  //   article: ArticleInterface,
  // ): Observable<ArticleInterface> {
  //   return this.httpClient.put<ArticleInterface>(
  //     `http://localhost:1268/articles/${id}`,
  //     article,
  //   );
  // }

  update(id: number, updateDTO: ArticleInterface): Observable<any> {
    const url = `http://localhost:1268/articles/${id}`;
    return this.httpClient.put(url, updateDTO);
  }

  getCalendar() {
    return this.httpClient.get('http://localhost:1268/calendar');
  }

  getCalendarDetails(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/calendar/' + id);
  }
}
