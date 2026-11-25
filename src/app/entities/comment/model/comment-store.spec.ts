import { TestBed } from '@angular/core/testing';
import { CommentApi } from '../api/comment-api';
import { CommentStore } from './comment-store';
import type { Comment, NewComment } from './types';

describe('CommentStore', () => {
  const comment: Comment = {
    id: 'c1',
    taskId: 't1',
    text: 'Комментарий',
    createdAt: '2026-11-20T10:00:00.000Z',
  };

  let store: CommentStore;
  let api: {
    getAll: ReturnType<typeof vi.fn<() => readonly Comment[]>>;
    create: ReturnType<typeof vi.fn<(input: NewComment) => Comment>>;
    remove: ReturnType<typeof vi.fn<(id: string) => void>>;
  };

  beforeEach(() => {
    api = {
      getAll: vi.fn<() => readonly Comment[]>().mockReturnValue([comment]),
      create: vi.fn<(input: NewComment) => Comment>(),
      remove: vi.fn<(id: string) => void>(),
    };
    TestBed.configureTestingModule({
      providers: [CommentStore, { provide: CommentApi, useValue: api }],
    });
    store = TestBed.inject(CommentStore);
  });

  it('загружает комментарии только один раз', () => {
    store.load();
    store.load();
    expect(api.getAll).toHaveBeenCalledTimes(1);
    expect(store.comments()).toEqual([comment]);
  });

  it('добавляет комментарий в конец списка', () => {
    store.load();
    const created: Comment = { ...comment, id: 'c2', text: 'Новый' };
    api.create.mockReturnValue(created);
    store.add({ taskId: 't1', text: 'Новый' });
    expect(store.comments()[1]).toEqual(created);
  });

  it('удаляет комментарий по id', () => {
    store.load();
    store.remove('c1');
    expect(api.remove).toHaveBeenCalledWith('c1');
    expect(store.comments()).toEqual([]);
  });
});
