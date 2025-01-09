import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from '../models/task.model';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;

  @Output() taskSubmit: EventEmitter<Task> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  taskForm: FormGroup;

  statuses = ['Pending', 'In Progress', 'Completed'];
  priorities = ['Low', 'Medium', 'High'];

  constructor(private fb: FormBuilder, private auth: AuthServiceService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        dueDate: this.task.dueDate,
        status: this.task.status,
        priority: this.task.priority,
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      console.log('Submitting New Task:', task);
      if (this.task) {
        this.taskSubmit.emit(task);
      } else {
        this.auth.submitTask(task);
      }
      this.taskForm.reset();
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.taskForm.reset();
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }

  get status() {
    return this.taskForm.get('status');
  }

  get priority() {
    return this.taskForm.get('priority');
  }
}
