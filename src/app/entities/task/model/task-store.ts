import { Injectable, inject, signal } from '@angular/core';
import { TaskApi } from '../api/task-api';
import type { NewTask, Task } from './types';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly api = inject(TaskApi);
  private readonly items = signal<readonly Task[]>([]);
  private readonly loaded = signal(false);

  readonly tasks = this.items.asReadonly();

  load(): void {
    if (this.loaded()) {
      return;
    }
    this.items.set(this.api.getAll());
    this.loaded.set(true);
  }

  add(input: NewTask): void {
    const task = this.api.create(input);
    this.items.update((tasks) => [task, ...tasks]);
  }

  update(task: Task): void {
    this.api.update(task);
    this.items.update((tasks) => tasks.map((t) => (t.id === task.id ? task : t)));
  }

  remove(id: string): void {
    this.api.remove(id);
    this.items.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
