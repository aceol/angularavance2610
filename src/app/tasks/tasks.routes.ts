import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskDetail } from './task-detail/task-detail';
import { taskResolver } from './task-detail/task.resolver';

export const TASKS_ROUTES: Routes = [
  { path: '', component: TaskList },
  {
    path: ':id',
    component: TaskDetail,
    resources: taskResolver,
  },
];
