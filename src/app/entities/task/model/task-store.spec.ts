import { TestBed } from '@angular/core/testing';
import { TaskApi } from '../api/task-api';
import { TaskStore } from './task-store';
import type { NewTask, Task } from './types';

describe('TaskStore', () => {
  const task: Task = {
    id: 't1',
    title: 'Задача',
    description: '',
    status: 'backlog',
    priority: 'medium',
    createdAt: '2026-11-20T10:00:00.000Z',
  };

  let store: TaskStore;
  let api: {
    getAll: ReturnType<typeof vi.fn<() => Promise<readonly Task[]>>>;
    create: ReturnType<typeof vi.fn<(input: NewTask) => Promise<Task>>>;
    update: ReturnType<typeof vi.fn<(task: Task) => Promise<void>>>;
    remove: ReturnType<typeof vi.fn<(id: string) => Promise<void>>>;
  };

  beforeEach(() => {
    api = {
      getAll: vi.fn<() => Promise<readonly Task[]>>().mockResolvedValue([task]),
      create: vi.fn<(input: NewTask) => Promise<Task>>(),
      update: vi.fn<(task: Task) => Promise<void>>().mockResolvedValue(undefined),
      remove: vi.fn<(id: string) => Promise<void>>().mockResolvedValue(undefined),
    };
    TestBed.configureTestingModule({
      providers: [TaskStore, { provide: TaskApi, useValue: api }],
    });
    store = TestBed.inject(TaskStore);
  });

  it('загружает задачи только один раз', async () => {
    await store.load();
    await store.load();
    expect(api.getAll).toHaveBeenCalledTimes(1);
    expect(store.tasks()).toEqual([task]);
    expect(store.loading()).toBe(false);
  });

  it('добавляет задачу в начало списка', async () => {
    const created: Task = { ...task, id: 't2', title: 'Новая' };
    api.create.mockResolvedValue(created);
    await store.add({ title: 'Новая', description: '', status: 'backlog', priority: 'medium' });
    expect(store.tasks()[0]).toEqual(created);
  });

  it('обновляет задачу по id', async () => {
    await store.load();
    const moved: Task = { ...task, status: 'done' };
    await store.update(moved);
    expect(api.update).toHaveBeenCalledWith(moved);
    expect(store.tasks()).toEqual([moved]);
  });

  it('удаляет задачу по id', async () => {
    await store.load();
    await store.remove('t1');
    expect(api.remove).toHaveBeenCalledWith('t1');
    expect(store.tasks()).toEqual([]);
  });
});
