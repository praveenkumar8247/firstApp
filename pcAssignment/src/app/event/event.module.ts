import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventListComponent, EventDetailsComponent, EventFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,

    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  exports: [EventListComponent, EventDetailsComponent, EventFormComponent],
})
export class EventModule {}
