import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksApiService } from './tasks.api.service';
import { Task } from '../core/models/task.model';
export const taskResolver: ResolveFn<Task | undefined> = (
  route: ActivatedRouteSnapshot,
): Observable<Task | undefined> => {
  const tasksApi = inject(TasksApiService);
  const taskId = route.paramMap.get('id'); // On récupère l'ID depuis l'URL
  if (!taskId) {
    return of(undefined); // Si pas d'ID, on ne retourne rien
  }
  return tasksApi.getById(taskId);
};
