import { Injectable, inject } from '@angular/core';
import { TaskStore, type Task } from '@entities/task';
import type { User } from '@entities/user';

@Injectable({ providedIn: 'root' })
export class AssignTask {
  private readonly store = inject(TaskStore);

  execute(task: Task, assignee: User | null): void {
    this.store.update({ ...task, assignee });
  }
}
