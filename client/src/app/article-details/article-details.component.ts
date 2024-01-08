import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailsInterface } from './article-details.interface';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  id: string | undefined | null;
  data: undefined | ArticleDetailsInterface;

  constructor(
    private route: ActivatedRoute,
    private readonly articleDetailsService: ServicesService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.articleDetailsService
          .getArticleDetails(this.id)
          .subscribe((articleData) => {
            this.data = articleData;
            console.log(this.data);
          });
      }
    });
  }
}
