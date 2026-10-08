import { Component, inject, signal } from '@angular/core';
import { TasksStateService } from '../tasks.state.service';
import { TaskForm } from '../task-form/task-form';
import { RouterLink } from '@angular/router';

@Component({
  imports: [TaskForm, RouterLink],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList {
  readonly #tasksState = inject(TasksStateService);

  protected readonly tasksTodo = this.#tasksState.tasksTodo;
  protected readonly tasksInProgress = this.#tasksState.tasksInProgress;
  protected readonly tasksDone = this.#tasksState.tasksDone;
  protected readonly totalTasks = this.#tasksState.totalTasks;
  // Signal pour gérer la visibilité du formulaire
  protected readonly isFormVisible = signal(false);

  ngOnInit() {
    this.#tasksState.fetchAll();
  }

  protected closeForm(): void {
    this.isFormVisible.set(false);
  }
}
