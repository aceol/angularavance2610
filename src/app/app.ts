import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';

import { Header } from './layout/header/header';
import { AuthStore } from './core/auth/auth.store';
import { Login } from './core/auth/login/login';
import { TaskList } from './tasks/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [Header, Login, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #authStore = inject(AuthStore);

  protected readonly isLoggedIn = this.#authStore.isLoggedIn;
}
