import { Injectable, inject } from '@angular/core';
import { MockDb } from '@shared/api';
import { generateId } from '@shared/lib';
import type { Comment, NewComment } from '../model/types';
import { createSeedComments } from './comment-seed';

const TABLE = 'comments';

@Injectable({ providedIn: 'root' })
export class CommentApi {
  private readonly db = inject(MockDb);

  getAll(): readonly Comment[] {
    const stored = this.db.read<readonly Comment[]>(TABLE);
    if (stored !== null) {
      return stored;
    }
    const seed = createSeedComments();
    this.db.write(TABLE, seed);
    return seed;
  }

  create(input: NewComment): Comment {
    const comment: Comment = { ...input, id: generateId(), createdAt: new Date().toISOString() };
    this.db.write(TABLE, [...this.getAll(), comment]);
    return comment;
  }

  remove(id: string): void {
    this.db.write(
      TABLE,
      this.getAll().filter((comment) => comment.id !== id),
    );
  }
}
