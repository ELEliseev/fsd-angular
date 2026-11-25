import { Injectable, inject, signal } from '@angular/core';
import { CommentApi } from '../api/comment-api';
import type { Comment, NewComment } from './types';

@Injectable({ providedIn: 'root' })
export class CommentStore {
  private readonly api = inject(CommentApi);
  private readonly items = signal<readonly Comment[]>([]);
  private readonly loaded = signal(false);

  readonly comments = this.items.asReadonly();

  load(): void {
    if (this.loaded()) {
      return;
    }
    this.items.set(this.api.getAll());
    this.loaded.set(true);
  }

  add(input: NewComment): void {
    const comment = this.api.create(input);
    this.items.update((comments) => [...comments, comment]);
  }

  remove(id: string): void {
    this.api.remove(id);
    this.items.update((comments) => comments.filter((comment) => comment.id !== id));
  }
}
