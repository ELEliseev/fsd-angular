import { TestBed } from '@angular/core/testing';
import { TaskStore, type Task } from '@entities/task';
import { MoveTask, adjacentStatus } from './move-task';

describe('adjacentStatus', () => {
  it('из бэклога можно только вперёд', () => {
    expect(adjacentStatus('backlog', 'prev')).toBeNull();
    expect(adjacentStatus('backlog', 'next')).toBe('in-progress');
  });

  it('из середины можно в обе стороны', () => {
    expect(adjacentStatus('in-progress', 'prev')).toBe('backlog');
    expect(adjacentStatus('in-progress', 'next')).toBe('done');
  });

  it('из готово можно только назад', () => {
    expect(adjacentStatus('done', 'next')).toBeNull();
    expect(adjacentStatus('done', 'prev')).toBe('in-progress');
  });
});

describe('MoveTask', () => {
  const task: Task = {
    id: 't1',
    title: 'Задача',
    description: '',
    status: 'backlog',
    priority: 'medium',
    createdAt: '2026-11-20T10:00:00.000Z',
  };

  let moveTask: MoveTask;
  let update: ReturnType<typeof vi.fn<(task: Task) => Promise<void>>>;

  beforeEach(() => {
    update = vi.fn<(task: Task) => Promise<void>>().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [MoveTask, { provide: TaskStore, useValue: { update } }],
    });
    moveTask = TestBed.inject(MoveTask);
  });

  it('переносит задачу в соседний статус', async () => {
    await moveTask.execute(task, 'next');
    expect(update).toHaveBeenCalledWith({ ...task, status: 'in-progress' });
  });

  it('не трогает стор на краю доски', async () => {
    await moveTask.execute(task, 'prev');
    expect(update).not.toHaveBeenCalled();
  });
});
