import { Component, computed, inject } from '@angular/core';
import { TASK_STATUS_LABELS, TASK_STATUS_ORDER, TaskStore } from '@entities/task';

@Component({
  selector: 'board-stats',
  templateUrl: './board-stats.html',
  styleUrl: './board-stats.scss',
})
export class BoardStats {
  private readonly store = inject(TaskStore);

  protected readonly total = computed(() => this.store.tasks().length);

  protected readonly stats = computed(() =>
    TASK_STATUS_ORDER.map((status) => ({
      status,
      label: TASK_STATUS_LABELS[status],
      count: this.store.tasks().filter((task) => task.status === status).length,
    })),
  );
}
