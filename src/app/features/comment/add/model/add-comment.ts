import { Injectable, inject } from '@angular/core';
import { CommentStore, type NewComment } from '@entities/comment';

@Injectable({ providedIn: 'root' })
export class AddComment {
  private readonly store = inject(CommentStore);

  execute(input: NewComment): void {
    const text = input.text.trim();
    if (text === '') {
      throw new Error('Комментарий не может быть пустым');
    }
    this.store.add({ ...input, text });
  }
}
