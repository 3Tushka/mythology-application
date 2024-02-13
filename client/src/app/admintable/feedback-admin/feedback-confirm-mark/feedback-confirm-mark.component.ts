import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-feedback-confirm-mark',
  templateUrl: './feedback-confirm-mark.component.html',
  styleUrls: ['./feedback-confirm-mark.component.scss'],
})
export class FeedbackConfirmMarkComponent implements OnInit {
  id: string | null | undefined;

  constructor(
    private readonly markService: ServicesService,
    private readonly route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  markAsFixed(): void {
    this.markService.markFeedbackMessageAsFixed(this.id ?? '').subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => {
          this.router
            .navigateByUrl('/admin-table/feedback-admin', {
              skipLocationChange: true,
            })
            .then(() => {
              this.router.navigate([`/admin-table/feedback-admin`]);
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
        .navigateByUrl('/admin-table', {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([`/admin-table/feedback-admin`]);
        });
    }, 300);
  }
}
