import { Injectable, computed, signal } from '@angular/core';
import type { TaskPriority } from '@entities/task';
import type { TaskFilter } from './filter-tasks';

@Injectable({ providedIn: 'root' })
export class FilterTasksStore {
  readonly query = signal('');
  readonly priority = signal<TaskPriority | 'all'>('all');

  readonly filter = computed<TaskFilter>(() => ({
    query: this.query(),
    priority: this.priority(),
  }));

  reset(): void {
    this.query.set('');
    this.priority.set('all');
  }
}
