import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateCommentInterface } from './update-comment.interface';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss'],
})
export class UpdateCommentComponent implements OnInit {
  id: string | undefined | null;
  commentId: string | undefined | null;
  commentUpdateForm: FormGroup;

  constructor(
    private readonly updateCommentService: ServicesService,
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.commentId = params.get('commentId');

      console.log(this.id, this.commentId);
    });

    this.commentUpdateForm = this.fb.group({
      text: '',
    });
  }

  updateComment(): void {
    const updateDto: UpdateCommentInterface = this.commentUpdateForm.value;
    const parsedId = this.id ?? '';
    const parsedCommentId = this.commentId ?? '';

    console.log(parsedId, parsedCommentId);

    this.updateCommentService
      .updateComment(parsedId, parsedCommentId, updateDto)
      .subscribe(
        (response) => {
          console.log('Update successful', response);
          setTimeout(() => {
            this.commentUpdateForm.reset(); // Reset the form after a delay
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
}
