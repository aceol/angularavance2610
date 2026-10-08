import { computed, inject, Service, signal } from '@angular/core';

import { TasksApiService } from './tasks.api.service';
import { Task } from '../core/models/task.model';

@Service()
export class TasksStateService {
  readonly #apiService = inject(TasksApiService);

  readonly #tasks = signal<Task[]>([]);

  readonly tasks = this.#tasks.asReadonly();
  readonly tasksTodo = computed(() => this.#tasks().filter((task) => task.status === 'TODO'));
  readonly tasksInProgress = computed(() =>
    this.#tasks().filter((task) => task.status === 'IN_PROGRESS'),
  );
  readonly tasksDone = computed(() => this.#tasks().filter((task) => task.status === 'DONE'));
  readonly totalTasks = computed(() => this.#tasks().length);

  fetchAll(): void {
    this.#apiService.getAll().subscribe((tasks) => {
      this.#tasks.set(tasks);
    });
  }
}
