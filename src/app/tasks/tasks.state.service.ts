import { inject, Service, signal } from '@angular/core';

import { TasksApiService } from './tasks.api.service';

@Service()
export class TasksStateService {
  readonly #apiService = inject(TasksApiService);

  // État privé de la feature, exposé en lecture seule
  readonly #state = {
    items: signal<any[]>([]),
  } as const;

  readonly items = this.#state.items.asReadonly();

  fetchAll(): void {
    this.#apiService.getAll().subscribe((items) => {
      this.#state.items.set(items);
    });
  }
}
