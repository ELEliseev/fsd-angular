import { Injectable, inject } from '@angular/core';
import { TaskStore, type NewTask } from '@entities/task';

@Injectable({ providedIn: 'root' })
export class CreateTask {
  private readonly store = inject(TaskStore);

  execute(input: NewTask): void {
    const title = input.title.trim();
    if (title === '') {
      throw new Error('Название задачи не может быть пустым');
    }
    this.store.add({ ...input, title, description: input.description.trim() });
  }
}
