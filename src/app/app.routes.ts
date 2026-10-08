import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    loadChildren: () => import('./tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
    canMatch: [authGuard],
  },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
