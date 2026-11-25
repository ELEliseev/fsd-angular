import { Injectable, inject, signal } from '@angular/core';
import { TaskApi } from '../api/task-api';
import type { NewTask, Task } from './types';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly api = inject(TaskApi);
  private readonly items = signal<readonly Task[]>([]);
  private loaded = false;

  readonly tasks = this.items.asReadonly();
  readonly loading = signal(false);

  async load(): Promise<void> {
    if (this.loaded) {
      return;
    }
    this.loading.set(true);
    try {
      this.items.set(await this.api.getAll());
      this.loaded = true;
    } finally {
      this.loading.set(false);
    }
  }

  async add(input: NewTask): Promise<void> {
    const task = await this.api.create(input);
    this.items.update((tasks) => [task, ...tasks]);
  }

  async update(task: Task): Promise<void> {
    await this.api.update(task);
    this.items.update((tasks) => tasks.map((t) => (t.id === task.id ? task : t)));
  }

  async remove(id: string): Promise<void> {
    await this.api.remove(id);
    this.items.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
