import { TestBed } from '@angular/core/testing';
import { CommentStore, type NewComment } from '@entities/comment';
import { AddComment } from './add-comment';

describe('AddComment', () => {
  let addComment: AddComment;
  let add: ReturnType<typeof vi.fn<(input: NewComment) => void>>;

  beforeEach(() => {
    add = vi.fn<(input: NewComment) => void>();
    TestBed.configureTestingModule({
      providers: [AddComment, { provide: CommentStore, useValue: { add } }],
    });
    addComment = TestBed.inject(AddComment);
  });

  it('обрезает пробелы и привязывает к задаче', () => {
    addComment.execute({ taskId: 't1', text: '  текст  ' });
    expect(add).toHaveBeenCalledWith({ taskId: 't1', text: 'текст' });
  });

  it('не добавляет пустой комментарий', () => {
    expect(() => addComment.execute({ taskId: 't1', text: '   ' })).toThrow(
      'Комментарий не может быть пустым',
    );
    expect(add).not.toHaveBeenCalled();
  });
});
