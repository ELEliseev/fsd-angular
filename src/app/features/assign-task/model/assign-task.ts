import { Injectable, inject } from '@angular/core';
import { TaskStore, type Task } from '@entities/task';

@Injectable({ providedIn: 'root' })
export class AssignTask {
  private readonly store = inject(TaskStore);

  execute(task: Task, assigneeId: string | null): void {
    this.store.update({ ...task, assigneeId });
  }
}
