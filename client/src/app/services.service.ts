import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleInterface } from './interfaces/article.interface';
import { CalendarDetailsInterface } from './calendar-details/calendar-details.interface';
import { UpdateCommentInterface } from './interfaces/updateComment.interface';
import { CreateFeedbackMessageDto } from './interfaces/createFeedback.dto';
import { FeedbackInterface } from './interfaces/feedback.interface';
import { AddRoleDto } from './interfaces/addRole.dto';
import { BanUserDto } from './interfaces/banUser.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:1268/users');
  }

  addRole(dto: AddRoleDto): Observable<any> {
    return this.httpClient.post('http://localhost:1268/users/role', dto);
  }

  //Delete dto same as AddRoleDto. Lazy enough to create another dto
  deleteRole(dto: AddRoleDto): Observable<any> {
    return this.httpClient.post('http://localhost:1268/users/role/delete', dto);
  }

  banUser(dto: BanUserDto): Observable<any> {
    return this.httpClient.post('http://localhost:1268/users/ban', dto);
  }

  unbanUser(dto: BanUserDto): Observable<any> {
    return this.httpClient.post('http://localhost:1268/users/unban', dto);
  }

  getArticles() {
    return this.httpClient.get('http://localhost:1268/articles');
  }

  getArticleDetails(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:1268/articles/' + id);
  }

  createArticle(article: ArticleInterface): Observable<any> {
    return this.httpClient.post('http://localhost:1268/articles', article);
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

  createCalendarItem(calendarItem: CalendarDetailsInterface): Observable<any> {
    return this.httpClient.post('http://localhost:1268/calendar', calendarItem);
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
      `http://localhost:1268/articles/${id}/comments/${commentId}`,
    );
  }

  getUserInfo(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.get(`http://localhost:1268/profile/${id}`, {
      headers,
    });
  }

  updateUserInfo(id: string, updateDTO: any): Observable<any> {
    const url = `http://localhost:1268/profile/${id}`;
    return this.httpClient.put(url, updateDTO);
  }

  createFeedbackMessage(dto: CreateFeedbackMessageDto) {
    const url = `http://localhost:1268/feedback`;
    return this.httpClient.post(url, dto);
  }

  getAllFeedbackMessages() {
    return this.httpClient.get(
      `http://localhost:1268/admin-table/feedback-admin`,
    );
  }

  getFeedbackMessageById(id: string) {
    return this.httpClient.get(
      `http://localhost:1268/admin-table/feedback-admin/${id}`,
    );
  }

  deleteFeedbackMessage(id: string) {
    return this.httpClient.delete(
      `http://localhost::1268/admin-table/feedback-admin/${id}`,
    );
  }

  markFeedbackMessageAsFixed(id: string) {
    return this.httpClient.post(
      `http://localhost:1268/admin-table/feedback-admin/${id}/mark-as-fixed`,
      {},
    );
  }

  // idk fix fast
  getSearchFeedbackMessages(search: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get<FeedbackInterface[]>(
      `http://localhost:1268/feedback?theme=${search}`,
      { headers: headers },
    );
  }
}
