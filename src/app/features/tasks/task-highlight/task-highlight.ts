import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  imports: [],
  template: `
    <div class="task-highlight">
      <h3>Tâche mise en avant</h3>
      <p>{{ title }}</p>
    </div>
  `,
  styleUrl: './task-highlight.css',
})
export class TaskHighlight {
  @Input() title = ''; // le composant peut recevoir une donnée (le titre ici)
}
