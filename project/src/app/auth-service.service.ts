import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private taskSubject = new BehaviorSubject<Task | null>(null);
  task$ = this.taskSubject.asObservable();
  constructor() {}
  submitTask(task: Task): void {
    this.taskSubject.next(task);
  }
}
