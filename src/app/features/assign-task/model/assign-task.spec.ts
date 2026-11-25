import { TestBed } from '@angular/core/testing';
import { TaskStore, type Task } from '@entities/task';
import type { User } from '@entities/user';
import { AssignTask } from './assign-task';

describe('AssignTask', () => {
  const task: Task = {
    id: 't1',
    title: 'Задача',
    description: '',
    status: 'backlog',
    priority: 'medium',
    assignee: null,
    createdAt: '2026-11-20T10:00:00.000Z',
  };
  const user: User = { id: 'u1', name: 'Андрей', color: '#8b96f8' };

  let assignTask: AssignTask;
  let update: ReturnType<typeof vi.fn<(task: Task) => void>>;

  beforeEach(() => {
    update = vi.fn<(task: Task) => void>();
    TestBed.configureTestingModule({
      providers: [AssignTask, { provide: TaskStore, useValue: { update } }],
    });
    assignTask = TestBed.inject(AssignTask);
  });

  it('назначает исполнителя снапшотом', () => {
    assignTask.execute(task, user);
    expect(update).toHaveBeenCalledWith({ ...task, assignee: user });
  });

  it('снимает исполнителя', () => {
    assignTask.execute({ ...task, assignee: user }, null);
    expect(update).toHaveBeenCalledWith({ ...task, assignee: null });
  });
});
