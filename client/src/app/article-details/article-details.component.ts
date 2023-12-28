import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailsService } from './article-details.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  item$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private articleDetailsService: ArticleDetailsService,
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');

    if (itemId) {
      this.item$ = this.articleDetailsService.getArticleDetails(+itemId);
    }
  }
}
