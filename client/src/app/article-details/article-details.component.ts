import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailsInterface } from './article-details.interface';
import { ServicesService } from '../services.service';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ArticleInterface } from '../interfaces/article.interface';

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
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DialogElementsExampleDialog implements OnInit {
  updateForm: FormGroup;
  id: number;

  constructor(
    public dialog: MatDialog,
    private readonly articleDetailsService: ServicesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: '',
      content: '',
      category: '',
      image: '',
    });
  }

  // updateModel(id: number, updateDto: ArticleInterface): void {
  //   this.articleDetailsService.update(id, updateDto).subscribe(
  //     (response) => {
  //       console.log('Update successful', response);
  //     },
  //     (error) => {
  //       console.error('Error updating', error);
  //     },
  //   );
  // }
  updateModel(): void {
    const updateDto: ArticleInterface = this.updateForm.value;
    this.articleDetailsService.update(this.id, updateDto).subscribe(
      (response) => {
        console.log('Update successful', response);
      },
      (error) => {
        console.error('Error updating', error);
      },
    );
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
