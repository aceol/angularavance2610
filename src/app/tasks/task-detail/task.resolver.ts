import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TasksApiService } from '../tasks.api.service';

export const taskResolver = ({ params }: { params: () => Record<string, string> }) => {
  const tasksApi = inject(TasksApiService);
  return {
    task: rxResource({
      params: () => params()['id'] as string,
      stream: ({ params: taskId }) => tasksApi.getById(taskId),
    }),
  };
};
