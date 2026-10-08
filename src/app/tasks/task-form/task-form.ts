import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniqueTitleValidator } from '../../core/validators/unique-title.validators';
import { forbiddenWordValidator } from '../../core/validators/forbidden-word.validators copy';
import { TasksStateService } from '../tasks.state.service';
@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #uniqueTitleValidator = inject(UniqueTitleValidator);
  readonly #tasksState = inject(TasksStateService);
  readonly taskSaved = output<void>();
  protected readonly isAdding = this.#tasksState.isAdding;
  protected readonly addError = this.#tasksState.addError;

  protected readonly taskForm = this.#fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5)],
      [this.#uniqueTitleValidator.validate.bind(this.#uniqueTitleValidator)],
    ],
    description: ['', [forbiddenWordValidator('procrastination')]],
    status: ['TODO' as const],
  });

  protected saveTask(): void {
    if (this.taskForm.pending || this.taskForm.invalid) return;
    this.#tasksState.addTask(this.taskForm.getRawValue()).subscribe(() => {
      this.taskSaved.emit();
    });
  }
}
