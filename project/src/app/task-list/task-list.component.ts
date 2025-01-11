import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Task } from '../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'dueDate',
    'status',
    'priority',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Task>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'All';
  selectedPriority: string = 'All';
  selectedTask: Task | null = null;
  isModalOpen: boolean = false;

  defaultTasks: Task[] = [
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

  constructor(private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.tasks = [...this.defaultTasks];

    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      const storedTasks: Task[] = JSON.parse(tasksFromStorage);

      storedTasks.forEach((task) => {
        if (!this.tasks.some((t) => t.title === task.title)) {
          this.tasks.push(task);
        }
      });
    }

    this.applyFilters();

    this.auth.task$.subscribe((task: Task | null) => {
      if (task) {
        if (!this.tasks.some((t) => t.title === task.title)) {
          this.tasks.push(task);
          this.saveTasksToLocalStorage();
          this.applyFilters();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

    this.dataSource.data = this.filteredTasks;
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
      if (!this.tasks.some((t) => t.title === task.title)) {
        this.tasks.push(task);
      }
    }

    this.closeModal();
    this.saveTasksToLocalStorage();
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

  deleteTask(task: Task): void {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (isConfirmed) {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();
        this.applyFilters();
      }
    }
  }

  saveTasksToLocalStorage(): void {
    const nonDefaultTasks = this.tasks.filter(
      (task) =>
        !this.defaultTasks.some(
          (defaultTask) => defaultTask.title === task.title
        )
    );
    localStorage.setItem('tasks', JSON.stringify(nonDefaultTasks));
  }
}
