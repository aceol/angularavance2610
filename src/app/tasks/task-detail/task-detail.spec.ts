import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetail } from './task-detail';
import { provideRouter } from '@angular/router';
import { Task } from '../../core/models/task.model';

describe('TaskDetail', () => {
  let component: TaskDetail;
  let fixture: ComponentFixture<TaskDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {} as Task);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
