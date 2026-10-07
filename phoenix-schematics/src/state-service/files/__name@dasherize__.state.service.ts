import { inject, Service, signal } from '@angular/core';

import { <%= classify(name) %>ApiService } from './<%= dasherize(name) %>.api.service';

@Service()
export class <%= classify(name) %>StateService {
	readonly #apiService = inject(<%= classify(name) %>ApiService);

  // État privé de la feature, exposé en lecture seule
  readonly #state = {
    items: signal<any[]>([])
  } as const;

  readonly items = this.state.items.asReadonly();

	fetchAll(): void {
    this.#apiService.getAll().subscribe(items => {
      this.#state.items.set(items);
    });
  }
}