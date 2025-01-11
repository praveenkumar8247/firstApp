import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent {
  @Output() filterChange: EventEmitter<{ status: string; priority: string }> =
    new EventEmitter();

  statuses = ['All', 'Pending', 'In Progress', 'Completed'];
  priorities = ['All', 'Low', 'Medium', 'High'];

  selectedStatus: string = 'All';
  selectedPriority: string = 'All';

  onStatusChange(): void {
    this.emitFilterChange();
  }

  onPriorityChange(): void {
    this.emitFilterChange();
  }

  emitFilterChange(): void {
    this.filterChange.emit({
      status: this.selectedStatus,
      priority: this.selectedPriority,
    });
  }
}
