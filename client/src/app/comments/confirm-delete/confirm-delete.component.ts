import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  id: string | undefined | null;
  commentId: string | undefined | null;

  constructor(
    private readonly deleteComfirm: ServicesService,
    private readonly route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.commentId = params.get('commentId');
    });
  }

  deleteComment(): void {
    this.deleteComfirm
      .deleteComment(this.id ?? '', this.commentId ?? '')
      .subscribe(
        (res) => {
          console.log(res);
          setTimeout(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([`/articles/${this.id}/comments`]);
              });
          }, 300);
        },
        (error) => {
          console.error('Error occurred:', error);
        },
      );
  }

  returnToComments(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`/articles/${this.id}/comments`]);
      });
    }, 300);
  }
}
