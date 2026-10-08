import { Component, inject } from '@angular/core';
import { TasksStateService } from '../tasks.state.service';

@Component({
  imports: [],
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

  ngOnInit() {
    this.#tasksState.fetchAll();
  }
}
