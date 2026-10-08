import { computed, inject, Service, signal } from '@angular/core';

import { TasksApiService } from './tasks.api.service';
import { Task } from '../core/models/task.model';
import { Observable, tap } from 'rxjs';

@Service()
export class TasksStateService {
  readonly #apiService = inject(TasksApiService);

  readonly #tasks = signal<Task[]>([]);

  readonly tasks = this.#tasks.asReadonly();
  readonly #isAdding = signal(false);
  readonly #addError = signal<string | null>(null);
  readonly isAdding = this.#isAdding.asReadonly();
  readonly addError = this.#addError.asReadonly();
  readonly tasksTodo = computed(() => this.#tasks().filter((task) => task.status === 'TODO'));
  readonly tasksInProgress = computed(() =>
    this.#tasks().filter((task) => task.status === 'IN_PROGRESS'),
  );
  readonly tasksDone = computed(() => this.#tasks().filter((task) => task.status === 'DONE'));
  readonly totalTasks = computed(() => this.#tasks().length);

  fetchAll(): void {
    this.#apiService.getAll().subscribe((tasks) => {
      this.#tasks.set([...tasks]);
    });
  }

  addTask(taskData: Omit<Task, 'id'>): Observable<Task> {
    this.#isAdding.set(true);
    this.#addError.set(null);
    return this.#apiService.addTask(taskData).pipe(
      tap({
        next: (newTask) => {
          // En cas de succès, on met à jour notre état local
          this.#tasks.update((currentTasks) => [...currentTasks, newTask]);
          this.#isAdding.set(false);
        },
        error: (err: Error) => {
          // En cas d'erreur, on met à jour le signal d'erreur
          this.#addError.set(err.message);
          this.#isAdding.set(false);
        },
      }),
    );
  }
}
