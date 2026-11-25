import { Injectable, inject } from '@angular/core';
import { MockDb } from '@shared/api';
import { generateId } from '@shared/lib';
import type { NewTask, Task } from '../model/types';
import { createSeedTasks } from './task-seed';

const TABLE = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly db = inject(MockDb);

  getAll(): readonly Task[] {
    const stored = this.db.read<readonly Task[]>(TABLE);
    if (stored !== null) {
      return stored;
    }
    const seed = createSeedTasks();
    this.db.write(TABLE, seed);
    return seed;
  }

  create(input: NewTask): Task {
    const task: Task = { ...input, id: generateId(), createdAt: new Date().toISOString() };
    this.db.write(TABLE, [task, ...this.getAll()]);
    return task;
  }

  update(task: Task): void {
    this.db.write(
      TABLE,
      this.getAll().map((t) => (t.id === task.id ? task : t)),
    );
  }

  remove(id: string): void {
    this.db.write(
      TABLE,
      this.getAll().filter((t) => t.id !== id),
    );
  }
}
