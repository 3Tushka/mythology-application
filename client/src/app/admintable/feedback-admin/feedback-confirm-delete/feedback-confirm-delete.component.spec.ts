import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackConfirmDeleteComponent } from './feedback-confirm-delete.component';

describe('FeedbackConfirmDeleteComponent', () => {
  let component: FeedbackConfirmDeleteComponent;
  let fixture: ComponentFixture<FeedbackConfirmDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackConfirmDeleteComponent]
    });
    fixture = TestBed.createComponent(FeedbackConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
