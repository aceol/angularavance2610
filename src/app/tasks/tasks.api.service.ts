import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, Observable, of, timer } from 'rxjs';
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
    // On simule un délai réseau de 500ms
    return of(MOCK_TASKS).pipe(delay(500));
  }
  getById(id: string): Observable<Task | undefined> {
    const task = MOCK_TASKS.find((task) => task.id === id);
    return timer(300).pipe(map(() => task));
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

  isTitleTaken(title: string): Observable<boolean> {
    const isTaken = MOCK_TASKS.some((t) => t.title.toLowerCase() === title.toLowerCase());
    return timer(500).pipe(map(() => isTaken));
  }

  addTask(taskData: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...taskData,
      id: `task-${Math.random().toString(36).substring(2, 9)}`, //Simulation d'un ID unique
    };
    MOCK_TASKS.push(newTask);
    return timer(500).pipe(map(() => newTask));
  }
}
