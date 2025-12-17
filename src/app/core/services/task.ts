import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TaskItem {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'Préparer le cours de demain' },
    { id: 2, title: 'Corriger le cours de hier' },
    { id: 3, title: 'Jsp' },
  ];

  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask: TaskItem = { id: Date.now(), title };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }
}
