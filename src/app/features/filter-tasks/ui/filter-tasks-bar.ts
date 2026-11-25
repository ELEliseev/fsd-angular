import { Component, computed, inject } from '@angular/core';
import { TASK_PRIORITY_LABELS, TASK_PRIORITY_ORDER, type TaskPriority } from '@entities/task';
import { UiButton, UiInput, UiSelect, type UiSelectOption } from '@shared/ui';
import { FilterTasksStore } from '../model/filter-tasks-store';

@Component({
  selector: 'filter-tasks-bar',
  imports: [UiButton, UiInput, UiSelect],
  templateUrl: './filter-tasks-bar.html',
  styleUrl: './filter-tasks-bar.scss',
})
export class FilterTasksBar {
  protected readonly store = inject(FilterTasksStore);

  protected readonly priorityOptions: readonly UiSelectOption[] = [
    { value: 'all', label: 'Все приоритеты' },
    ...TASK_PRIORITY_ORDER.map((priority) => ({
      value: priority,
      label: TASK_PRIORITY_LABELS[priority],
    })),
  ];

  protected readonly hasActiveFilter = computed(
    () => this.store.query() !== '' || this.store.priority() !== 'all',
  );

  protected setPriority(value: string): void {
    this.store.priority.set(value as TaskPriority | 'all');
  }
}
