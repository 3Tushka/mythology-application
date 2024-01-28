import { Component, OnInit } from '@angular/core';
import { ArticleDetailsInterface } from '../article-details/article-details.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { HttpClient } from '@angular/common/http';
import { UpdateCommentInterface } from './interface/updateComment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  id: string | undefined | null;
  commentId: string | undefined | null;
  data: undefined | ArticleDetailsInterface;

  postComment: FormGroup;

  constructor(
    private readonly commentService: ServicesService,
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.commentService
          .getArticleDetails(this.id)
          .subscribe((articleData) => {
            this.data = articleData;
            console.log(this.data);
          });
      }

      this.postComment = this.fb.group({
        text: '',
      });
    });
  }

  submitPostComment(): void {
    this.http
      .post(
        `http://localhost:1268/articles/${this.id}/comments`,
        this.postComment.getRawValue(),
        { withCredentials: true },
      )
      .subscribe(
        () => {
          setTimeout(() => {
            this.postComment.reset();
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([`/articles/${this.id}/comments`]);
              });
          }, 300);
        },
        (error) => {
          console.error('Error updating', error);
        },
      );
  }

  deleteComment(id: string, commentId: string): void {
    this.commentService.deleteComment(id, commentId);
  }
}
