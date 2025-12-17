import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskHighlight } from '../features/tasks/task-highlight/task-highlight';
import { Task, TaskItem } from '../core/services/task';

@Component({
  selector: 'app-tasks-page',
  imports: [AsyncPipe],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  tasks$;

  constructor(private taskService: Task) {
    this.tasks$ = this.taskService.tasks$;
  }

  highlight(task: TaskItem) {
    // Efface le contenu précédent
    this.container.clear();

    // Crée le composant TaskHighlight
    const ref = this.container.createComponent(TaskHighlight);

    // Passe les données au composant
    ref.instance.title = task.title;
  }

  addTask(input: HTMLInputElement) {
    const title = input.value.trim();
    if (title) {
      this.taskService.addTask(title);
      input.value = '';
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
