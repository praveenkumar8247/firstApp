import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  event: any = { title: '', description: '', date: '', location: '' };
  isEditMode = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.isEditMode = true;
      this.eventService.getEvent(eventId).subscribe((data) => {
        this.event = data;
      });
    }
  }

  confirmSaveEvent() {
    if (
      !this.event.title ||
      !this.event.description ||
      !this.event.date ||
      !this.event.location
    ) {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        disableClose: true,
        data: { message: 'Please enter all the details' },
      });
    } else {
      this.saveEvent();
    }
  }

  saveEvent() {
    if (this.isEditMode && this.event.id) {
      this.eventService.updateEvent(this.event.id, this.event).subscribe(() => {
        this.router.navigate(['/event', this.event.id], {
          queryParams: { updated: 'true' },
        });
      });
    } else {
      this.eventService.createEvent(this.event).subscribe((createdEvent) => {
        this.router.navigate(['/event', createdEvent.id], {
          queryParams: { created: 'true' },
        });
      });
    }
  }

  cancelEdit() {
    if (this.isEditMode) {
      this.router.navigate(['/events']);
    } else {
      this.event = { title: '', description: '', date: '', location: '' };
    }
  }
}
