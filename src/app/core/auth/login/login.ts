import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly #authStore = inject(AuthStore);

  protected readonly isLoading = this.#authStore.isLoading;
  protected readonly error = this.#authStore.error;

  protected email = '';
  protected password = '';

  protected onSubmit(): void {
    this.#authStore.login({ email: this.email, password: this.password });
  }
}
