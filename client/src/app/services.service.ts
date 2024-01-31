import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleInterface } from './interfaces/article.interface';
import { CalendarDetailsInterface } from './calendar-details/calendar-details.interface';
import { CommentInterface } from './article-details/article-details.interface';
import { UpdateCommentInterface } from './interfaces/updateComment.interface';

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

  getSearchArticles(searchValue: string): Observable<ArticleInterface[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get<ArticleInterface[]>(
      `http://localhost:1268/articles?title=${searchValue}`,
      { headers: headers },
    );
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

  getCommentsByArticleId(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/articles/' + id);
  }

  updateComment(
    id: string,
    commentId: string,
    updateDTO: UpdateCommentInterface,
  ): Observable<any> {
    const url = `http://localhost:1268/articles/${id}/comments/${commentId}/update`;
    return this.httpClient.put(url, updateDTO);
  }

  deleteComment(id: string, commentId: string): Observable<any> {
    return this.httpClient.delete(
      `http://localhost:1268/articles/${id}/comments/${commentId}/update`,
    );
  }
}
