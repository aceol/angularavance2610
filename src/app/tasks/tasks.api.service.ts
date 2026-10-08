import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, Observable, of } from 'rxjs';
import { Task } from '../core/models/task.model';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Configurer le projet',
    description: 'Initialiser le repo et les dépendances',
    status: 'DONE',
  },
  {
    id: '2',
    title: 'Créer le service de state',
    description: 'Utiliser les Signals',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Développer le composant liste',
    description: 'Afficher les tâches',
    status: 'TODO',
  },
];

@Service()
export class TasksApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'https://api.phoenix.com/tasks';

  // Fonctions CRUD basiques qui retournent des Observables bruts
  getAll(): Observable<any[]> {
    // On simule un délai réseau de 1000ms
    return of(MOCK_TASKS).pipe(delay(1000));
  }
  getById(id: string | number): Observable<any> {
    return this.#http.get<any>(`${this.#baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.#http.post<any>(this.#baseUrl, data);
  }
  update(id: string | number, data: any): Observable<any> {
    return this.#http.put<any>(`${this.#baseUrl}/${id}`, data);
  }
  delete(id: string | number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/${id}`);
  }
}
