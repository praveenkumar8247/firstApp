import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private auth: AuthServiceService) {}
  tasks: Task[] = [
    {
      title: 'Task 1',
      description: 'Description of task 1',
      dueDate: '2025-01-15',
      status: 'Pending',
      priority: 'High',
    },
    {
      title: 'Task 2',
      description: 'Description of task 2',
      dueDate: '2025-01-20',
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      title: 'Task 3',
      description: 'Description of task 3',
      dueDate: '2025-01-25',
      status: 'Completed',
      priority: 'Low',
    },
  ];

  filteredTasks: Task[] = [...this.tasks];
  selectedStatus: string = 'All';
  selectedPriority: string = 'All';
  selectedTask: Task | null = null;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.auth.task$.subscribe((task: Task | null) => {
      if (task) {
        this.tasks.push(task);

        this.applyFilters();
      }
    });
    this.applyFilters();
  }

  onFilterChange(filters: { status: string; priority: string }): void {
    this.selectedStatus = filters.status;
    this.selectedPriority = filters.priority;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const statusMatch =
        this.selectedStatus === 'All' || task.status === this.selectedStatus;
      const priorityMatch =
        this.selectedPriority === 'All' ||
        task.priority === this.selectedPriority;
      return statusMatch && priorityMatch;
    });
  }

  onTaskSubmit(task: Task): void {
    if (this.selectedTask) {
      const index = this.tasks.findIndex(
        (t) => t.title === this.selectedTask?.title
      );
      if (index !== -1) {
        this.tasks[index] = { ...this.selectedTask, ...task };
      }
      this.selectedTask = null;
    } else {
    }
    this.closeModal();
    this.applyFilters();
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTask = null;
  }
}
