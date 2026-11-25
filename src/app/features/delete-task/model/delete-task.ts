import { Injectable, inject } from '@angular/core';
import { TaskStore } from '@entities/task';

@Injectable({ providedIn: 'root' })
export class DeleteTask {
  private readonly store = inject(TaskStore);

  execute(id: string): Promise<void> {
    return this.store.remove(id);
  }
}
