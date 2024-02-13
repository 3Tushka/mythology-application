import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackConfirmMarkComponent } from './feedback-confirm-mark.component';

describe('FeedbackConfirmMarkComponent', () => {
  let component: FeedbackConfirmMarkComponent;
  let fixture: ComponentFixture<FeedbackConfirmMarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackConfirmMarkComponent]
    });
    fixture = TestBed.createComponent(FeedbackConfirmMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
