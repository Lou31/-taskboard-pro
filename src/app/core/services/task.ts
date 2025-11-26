import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'Préparer le cours de demain' },
    { id: 2, title: 'Corriger le cours de hier' },
    { id: 3, title: 'Jsp' },
  ];

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask = { id: Date.now(), title };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }
}
