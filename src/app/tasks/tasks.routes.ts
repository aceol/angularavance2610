import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskDetail } from './task-detail/task-detail';
import { taskResolver } from './task-resolver';

export const TASKS_ROUTES: Routes = [
  { path: '', component: TaskList },
  {
    path: ':id',
    component: TaskDetail,
    resolve: {
      task: taskResolver, // La clé 'task' contiendra les données résolues
    },
  },
];
