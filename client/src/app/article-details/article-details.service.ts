import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleDetailsService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = "'http//localhost:1268/articles";

  getArticleDetails(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${+id}`);
  }
}
