import { Injectable, inject } from '@angular/core';
import { TaskStore, type NewTask } from '@entities/task';

@Injectable({ providedIn: 'root' })
export class CreateTask {
  private readonly store = inject(TaskStore);

  async execute(input: NewTask): Promise<void> {
    const title = input.title.trim();
    if (title === '') {
      throw new Error('Название задачи не может быть пустым');
    }
    await this.store.add({ ...input, title, description: input.description.trim() });
  }
}
