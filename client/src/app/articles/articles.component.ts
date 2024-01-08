import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles$!: Observable<any>;

  constructor(private articlesService: ServicesService) {}

  ngOnInit(): void {
    this.articles$ = this.articlesService.getArticles();
  }
}
