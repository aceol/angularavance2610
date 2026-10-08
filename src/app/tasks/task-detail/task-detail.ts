import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Importer RouterLink
import { Task } from '../../core/models/task.model';
@Component({
  selector: 'app-task-detail',
  imports: [RouterLink], // <-- Ajouter RouterLink aux imports
  templateUrl: './task-detail.html',
})
export class TaskDetail {
  task = input.required<Task>();
}
