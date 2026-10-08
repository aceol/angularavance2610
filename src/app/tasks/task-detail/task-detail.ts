import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../core/models/task.model';
@Component({
  selector: 'app-task-detail',
  imports: [RouterLink],
  templateUrl: './task-detail.html',
})
export class TaskDetail {
  task = input.required<Task | undefined>();
}
