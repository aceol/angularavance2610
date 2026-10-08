import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router'; // <-- Importer RouterLink
import { map } from 'rxjs';
import { Task } from '../../core/models/task.model';
@Component({
  selector: 'app-task-detail',
  imports: [RouterLink], // <-- Ajouter RouterLink aux imports
  templateUrl: './task-detail.html',
})
export class TaskDetail {
  readonly #route = inject(ActivatedRoute);
  protected readonly task = toSignal(
    this.#route.data.pipe(map((data) => data['task'] as Task | undefined)),
  );
}
