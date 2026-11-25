import { Injectable, inject } from '@angular/core';
import { TASK_STATUS_ORDER, TaskStore, type Task, type TaskStatus } from '@entities/task';

export type MoveDirection = 'prev' | 'next';

export function adjacentStatus(status: TaskStatus, direction: MoveDirection): TaskStatus | null {
  const index = TASK_STATUS_ORDER.indexOf(status);
  const target = direction === 'next' ? index + 1 : index - 1;
  return TASK_STATUS_ORDER[target] ?? null;
}

@Injectable({ providedIn: 'root' })
export class MoveTask {
  private readonly store = inject(TaskStore);

  async execute(task: Task, direction: MoveDirection): Promise<void> {
    const status = adjacentStatus(task.status, direction);
    if (status === null) {
      return;
    }
    await this.store.update({ ...task, status });
  }
}
