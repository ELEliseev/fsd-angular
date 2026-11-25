import { Injectable, inject } from '@angular/core';
import { CommentStore } from '@entities/comment';

@Injectable({ providedIn: 'root' })
export class DeleteComment {
  private readonly store = inject(CommentStore);

  execute(id: string): void {
    this.store.remove(id);
  }
}
