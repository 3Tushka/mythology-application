import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarDetailsInterface } from './calendar-details.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.scss'],
})
export class CalendarDetailsComponent implements OnInit {
  id: string | undefined | null;
  calendarData: undefined | CalendarDetailsInterface;

  updateForm: FormGroup;

  isAddButtonClicked = false;

  constructor(
    private route: ActivatedRoute,
    private readonly calendarDetailsService: ServicesService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.calendarDetailsService
          .getCalendarDetails(this.id)
          .subscribe((response) => {
            this.calendarData = response;
          });
      }

      this.updateForm = this.fb.group({
        title: '',
        content: '',
      });
    });
  }

  updateModel(): void {
    const updateDTO: CalendarDetailsInterface = this.updateForm.value;
    const parsedId = parseInt(this.id ?? '');
    console.log(parsedId);
    this.calendarDetailsService.updateCalendar(parsedId, updateDTO).subscribe(
      (response) => {
        console.log('Update successful', response);
        setTimeout(() => {
          this.updateForm.reset(); // Reset the form after a delay
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`/calendar/${this.id}`]);
            });
        }, 1000);
      },
      (error) => {
        console.log('Error', error);
      },
    );
  }

  delete(id: string): void {
    this.calendarDetailsService.deleteCalendar(id).subscribe();
  }

  onAddButtonClick(): void {
    this.isAddButtonClicked = true;
  }

  onCloseButtonClick(): void {
    this.isAddButtonClicked = false;
  }
}
