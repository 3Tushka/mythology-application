import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetailsInterface } from './article-details.interface';
import { ServicesService } from '../services.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleInterface } from '../interfaces/article.interface';
import { getRoleFromLocalStorage } from '../functions/getRoleFromLocalStorage';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  id: string | undefined | null;
  data: undefined | ArticleDetailsInterface;
  updateForm: FormGroup;

  showForm = false;

  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private readonly articleDetailsService: ServicesService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        getRoleFromLocalStorage.call(this);

        this.articleDetailsService
          .getArticleDetails(this.id)
          .subscribe((articleData) => {
            this.data = articleData;
            console.log(this.data);
          });
      }

      this.updateForm = this.fb.group({
        title: '',
        content: '',
        category: '',
        image: '',
      });
    });
  }

  updateModel(): void {
    const updateDto: ArticleInterface = this.updateForm.value;
    const parsedId = parseInt(this.id ?? '');
    console.log(parsedId);
    this.articleDetailsService.update(parsedId, updateDto).subscribe(
      (response) => {
        console.log('Update successful', response);
        setTimeout(() => {
          this.updateForm.reset(); // Reset the form after a delay
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`/articles/${this.id}`]);
            });
        }, 300);
      },
      (error) => {
        console.error('Error updating', error);
      },
    );
  }

  delete(id: string): void {
    this.articleDetailsService.deleteArticle(id).subscribe();
  }
}
