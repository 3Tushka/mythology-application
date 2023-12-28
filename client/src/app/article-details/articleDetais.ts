import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private httpClient: HttpClient) {}

  getArticle() {
    return this.httpClient.get('http://localhost:1268/articles/:id');
  }
}
