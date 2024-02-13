import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.scss'],
})
export class FeedbackAdminComponent implements OnInit {
  feedbacks: any;

  constructor(private readonly feedbackAdminService: ServicesService) {}

  ngOnInit(): void {
    this.feedbackAdminService
      .getAllFeedbackMessages()
      .subscribe((feedbacks) => {
        this.feedbacks = feedbacks;
      });
  }

  deleteFeedbackById(id: string) {
    this.feedbackAdminService.deleteFeedbackMessage(id).subscribe();
  }
}
