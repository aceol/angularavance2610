import { Component, inject, output, Signal, signal } from '@angular/core';
import {
  form,
  FormField,
  minLength,
  required,
  validate,
  validateAsync,
} from '@angular/forms/signals';
import { UniqueTitleValidator } from '../../core/validators/unique-title.validators';
import { TasksStateService } from '../tasks.state.service';
import { Task } from '../../core/models/task.model';
import { rxResource } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-task-form',
  imports: [FormField],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  readonly taskSaved = output<void>();
  readonly #tasksState = inject(TasksStateService);
  readonly #uniqueTitleValidator = inject(UniqueTitleValidator);
  protected readonly isAdding = this.#tasksState.isAdding;
  protected readonly addError = this.#tasksState.addError;

  protected readonly taskModel = signal<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'TODO',
  });

  private buildTitleResource = (titleSignal: Signal<string | undefined>) => {
    return rxResource({
      params: () => titleSignal(),
      stream: ({ params: title }) => this.#uniqueTitleValidator.validate({ value: title } as any),
    });
  };

  readonly taskForm = form(this.taskModel, (path) => {
    required(path.title, { message: 'Le titre est requis.' });
    minLength(path.title, 5, { message: 'Le titre doit faire au moins 5 caractères.' });
    validate(path.description, ({ value }) => {
      const description = value().toLowerCase();
      if (description.includes('procrastination')) {
        return {
          kind: 'forbiddenWord',
          message: 'Le mot "procrastination" est interdit.',
        };
      }
      return null;
    });
    validateAsync(path.title, {
      params: (ctx) => ctx.value(),
      factory: this.buildTitleResource,
      onSuccess: (result) =>
        result && result['uniqueTitle']
          ? { kind: 'uniqueTitle', message: 'Ce titre est déjà pris.' }
          : null,
      onError: () => null,
    });
  });

  protected saveTask(): void {
    if (this.taskForm().pending() || this.taskForm().invalid()) return;
    this.#tasksState.addTask(this.taskModel()).subscribe(() => {
      this.taskSaved.emit();
    });
  }
}
