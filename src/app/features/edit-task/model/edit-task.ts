import { Injectable, inject } from '@angular/core';
import { TaskStore, type Task } from '@entities/task';

export type TaskChanges = Pick<Task, 'title' | 'description' | 'priority'>;

@Injectable({ providedIn: 'root' })
export class EditTask {
  private readonly store = inject(TaskStore);

  execute(task: Task, changes: TaskChanges): void {
    const title = changes.title.trim();
    if (title === '') {
      throw new Error('Название задачи не может быть пустым');
    }
    this.store.update({
      ...task,
      title,
      description: changes.description.trim(),
      priority: changes.priority,
    });
  }
}
