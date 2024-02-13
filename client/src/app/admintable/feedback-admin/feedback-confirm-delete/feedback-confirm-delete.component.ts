import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-feedback-confirm-delete',
  templateUrl: './feedback-confirm-delete.component.html',
  styleUrls: ['./feedback-confirm-delete.component.scss'],
})
export class FeedbackConfirmDeleteComponent implements OnInit {
  id: string | null | undefined;

  constructor(
    private readonly deleteComfirm: ServicesService,
    private readonly route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
    });
  }

  deleteFeedback(): void {
    console.log(this.id);
    this.deleteComfirm.deleteFeedbackMessage(this.id ?? '').subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => {
          this.router
            .navigateByUrl('/feedback-admin', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`/feedback-admin`]);
            });
        }, 300);
      },
      (error) => {
        console.error('Error occurred:', error);
      },
    );
  }

  returnToFeedbackTable(): void {
    setTimeout(() => {
      this.router
        .navigateByUrl('/admin-table/feedback-admin', {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([`/feedback-admin`]);
        });
    }, 300);
  }
}
