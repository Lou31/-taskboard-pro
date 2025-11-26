import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks-page/route').then((m) => m.TASKS_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/route').then((m) => m.ABOUT),
  },
];
