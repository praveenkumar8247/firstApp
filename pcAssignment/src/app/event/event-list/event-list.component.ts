import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'date',
    'location',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  isSearchActive = false;
  isFilteredEmpty = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  viewEvent(id: string) {
    this.router.navigate(['/event', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.isSearchActive = filterValue.length > 0;

    this.dataSource.filterPredicate = (data, filter) => {
      return data.title.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue;
    this.isFilteredEmpty = this.dataSource.filteredData.length === 0;
  }

  createEvent() {
    this.router.navigate(['/create']);
  }

  deleteEvent(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        message: 'Are you sure you want to delete this event?',
        showConfirm: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.eventService.deleteEvent(id).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }

  editEvent(id: string) {
    this.router.navigate(['/edit', id]);
  }
}
