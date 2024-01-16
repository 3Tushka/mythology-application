import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailsInterface } from './article-details.interface';
import { ServicesService } from '../services.service';
import { UpdateArticleDto } from '../../../../src/articles/dto/update-article.dto';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    public dialog: MatDialog,
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

  delete(id: string): void {
    this.articleDetailsService.deleteArticle(id).subscribe();
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class DialogElementsExampleDialog {
  data: undefined | UpdateArticleDto;
  productMessage: undefined | string;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private readonly articleDetailsService: ServicesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  update(id: string, dto: UpdateArticleDto): void {
    this.articleDetailsService.updateArticle(id, dto).subscribe();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
