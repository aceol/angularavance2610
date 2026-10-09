import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { Task } from '../core/models/task.model';
import { TasksApiService } from './tasks.api.service';
import { TasksStateService } from './tasks.state.service';

describe('TasksStateService', () => {
  let service: TasksStateService;
  let mockTasksApiService: Pick<TasksApiService, 'addTask' | 'getAll'>;

  beforeEach(() => {
    mockTasksApiService = {
      addTask: vi.fn().mockName('TasksApiService.addTask'),
      getAll: vi.fn().mockName('TasksApiService.getAll'),
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        TasksStateService,
        { provide: TasksApiService, useValue: mockTasksApiService },
      ],
    });
    service = TestBed.inject(TasksStateService);
  });

  describe('addTask', () => {
    it('doit ajouter une tâche au state', () => {
      const newTaskData: Omit<Task, 'id'> = {
        title: 'Test',
        description: 'Desc',
        status: 'TODO',
      };
      const returnedTask: Task = { ...newTaskData, id: '123' };
      vi.mocked(mockTasksApiService.addTask).mockReturnValue(of(returnedTask));

      service.addTask(newTaskData).subscribe();

      expect(mockTasksApiService.addTask).toHaveBeenCalledExactlyOnceWith(newTaskData);
      expect(service.tasks()).toStrictEqual([returnedTask]);
    });
  });
});
