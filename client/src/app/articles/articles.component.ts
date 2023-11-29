import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles$!: Observable<any>;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articles$ = this.articlesService.getArticles();
  }
}
