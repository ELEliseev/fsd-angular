import { TestBed } from '@angular/core/testing';
import { TaskStore, type Task } from '@entities/task';
import { AssignTask } from './assign-task';

describe('AssignTask', () => {
  const task: Task = {
    id: 't1',
    title: 'Задача',
    description: '',
    status: 'backlog',
    priority: 'medium',
    assigneeId: null,
    createdAt: '2026-11-20T10:00:00.000Z',
  };

  let assignTask: AssignTask;
  let update: ReturnType<typeof vi.fn<(task: Task) => void>>;

  beforeEach(() => {
    update = vi.fn<(task: Task) => void>();
    TestBed.configureTestingModule({
      providers: [AssignTask, { provide: TaskStore, useValue: { update } }],
    });
    assignTask = TestBed.inject(AssignTask);
  });

  it('назначает исполнителя по id', () => {
    assignTask.execute(task, 'u1');
    expect(update).toHaveBeenCalledWith({ ...task, assigneeId: 'u1' });
  });

  it('снимает исполнителя', () => {
    assignTask.execute({ ...task, assigneeId: 'u1' }, null);
    expect(update).toHaveBeenCalledWith({ ...task, assigneeId: null });
  });
});
