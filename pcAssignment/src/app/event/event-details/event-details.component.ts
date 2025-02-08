import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Event } from '../event.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: Event | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  message: string = '';
  buttonLabel: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const isCreated = this.route.snapshot.queryParamMap.get('created');
    const isUpdated = this.route.snapshot.queryParamMap.get('updated');

    if (id) {
      this.fetchEvent(id);

      if (isCreated === 'true') {
        this.message = 'Event Created Successfully!';
        this.buttonLabel = 'View in Events';
      } else if (isUpdated === 'true') {
        this.message = 'Details Updated Succcessfully!';
        this.buttonLabel = 'Back to Events';
      } else {
        this.message = 'Event Details';
        this.buttonLabel = 'Back to Events';
      }
    } else {
      this.errorMessage = 'Invalid Event ID';
      console.error('Event ID is missing or invalid!');
    }
  }

  private fetchEvent(id: string): void {
    this.eventService
      .getEvent(id)
      .pipe(
        catchError((error) => {
          console.error('Error fetching event:', error);
          this.errorMessage = 'Failed to load event details';
          return of(null);
        })
      )
      .subscribe((event) => {
        this.event = event;
        this.isLoading = false;
      });
  }

  handleNavigation() {
    this.router.navigate(['/events']);
  }
}
