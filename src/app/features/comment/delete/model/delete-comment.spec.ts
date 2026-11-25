import { TestBed } from '@angular/core/testing';
import { CommentStore } from '@entities/comment';
import { DeleteComment } from './delete-comment';

describe('DeleteComment', () => {
  it('удаляет комментарий через стор', () => {
    const remove = vi.fn<(id: string) => void>();
    TestBed.configureTestingModule({
      providers: [DeleteComment, { provide: CommentStore, useValue: { remove } }],
    });
    TestBed.inject(DeleteComment).execute('c1');
    expect(remove).toHaveBeenCalledWith('c1');
  });
});
