import { Component, inject } from '@angular/core';
import { Task } from '../core/services/task';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  taskService = inject(Task);
  tasks$ = this.taskService.tasks$;

  count = 0;
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    console.log('Compteur stoppé');
  }

  addTask(title: string) {
    this.taskService.addTask(title);
  }
}
