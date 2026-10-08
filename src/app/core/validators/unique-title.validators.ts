import { Service, inject } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { TasksApiService } from '../../tasks/tasks.api.service';

@Service()
export class UniqueTitleValidator implements AsyncValidator {
  readonly #tasksApi = inject(TasksApiService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.#tasksApi.isTitleTaken(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueTitle: true } : null)),
      catchError(() => of(null)), // En cas d'erreur API, on ne bloque pas le formulaire
    );
  }
}
