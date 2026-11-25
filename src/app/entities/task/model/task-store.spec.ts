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
    assignee: null,
    createdAt: '2026-11-20T10:00:00.000Z',
  };

  let store: TaskStore;
  let api: {
    getAll: ReturnType<typeof vi.fn<() => readonly Task[]>>;
    create: ReturnType<typeof vi.fn<(input: NewTask) => Task>>;
    update: ReturnType<typeof vi.fn<(task: Task) => void>>;
    remove: ReturnType<typeof vi.fn<(id: string) => void>>;
  };

  beforeEach(() => {
    api = {
      getAll: vi.fn<() => readonly Task[]>().mockReturnValue([task]),
      create: vi.fn<(input: NewTask) => Task>(),
      update: vi.fn<(task: Task) => void>(),
      remove: vi.fn<(id: string) => void>(),
    };
    TestBed.configureTestingModule({
      providers: [TaskStore, { provide: TaskApi, useValue: api }],
    });
    store = TestBed.inject(TaskStore);
  });

  it('загружает задачи только один раз', () => {
    store.load();
    store.load();
    expect(api.getAll).toHaveBeenCalledTimes(1);
    expect(store.tasks()).toEqual([task]);
  });

  it('добавляет задачу в начало списка', () => {
    const created: Task = { ...task, id: 't2', title: 'Новая' };
    api.create.mockReturnValue(created);
    store.add({
      title: 'Новая',
      description: '',
      status: 'backlog',
      priority: 'medium',
      assignee: null,
    });
    expect(store.tasks()[0]).toEqual(created);
  });

  it('обновляет задачу по id', () => {
    store.load();
    const moved: Task = { ...task, status: 'done' };
    store.update(moved);
    expect(api.update).toHaveBeenCalledWith(moved);
    expect(store.tasks()).toEqual([moved]);
  });

  it('удаляет задачу по id', () => {
    store.load();
    store.remove('t1');
    expect(api.remove).toHaveBeenCalledWith('t1');
    expect(store.tasks()).toEqual([]);
  });
});
