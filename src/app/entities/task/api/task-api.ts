import { Injectable, inject } from '@angular/core';
import { MockDb } from '@shared/api';
import { generateId } from '@shared/lib';
import type { NewTask, Task } from '../model/types';
import { createSeedTasks } from './task-seed';

const TABLE = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly db = inject(MockDb);

  async getAll(): Promise<readonly Task[]> {
    const stored = await this.db.read<readonly Task[]>(TABLE);
    if (stored !== null) {
      return stored;
    }
    const seed = createSeedTasks();
    await this.db.write(TABLE, seed);
    return seed;
  }

  async create(input: NewTask): Promise<Task> {
    const task: Task = { ...input, id: generateId(), createdAt: new Date().toISOString() };
    const tasks = await this.getAll();
    await this.db.write(TABLE, [task, ...tasks]);
    return task;
  }

  async update(task: Task): Promise<void> {
    const tasks = await this.getAll();
    await this.db.write(
      TABLE,
      tasks.map((t) => (t.id === task.id ? task : t)),
    );
  }

  async remove(id: string): Promise<void> {
    const tasks = await this.getAll();
    await this.db.write(
      TABLE,
      tasks.filter((t) => t.id !== id),
    );
  }
}
