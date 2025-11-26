import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav>
      <a routerLink="">Home</a>
      <a routerLink="about">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  protected title = 'taskboard_v4';
}
