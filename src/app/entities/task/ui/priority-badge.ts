import { Component, computed, input } from '@angular/core';
import { TASK_PRIORITY_LABELS } from '../model/task-meta';
import type { TaskPriority } from '../model/types';

@Component({
  selector: 'priority-badge',
  template: `<span [class]="'badge badge--' + priority()">{{ label() }}</span>`,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    .badge--high {
      background: color-mix(in srgb, var(--danger) 16%, transparent);
      color: var(--danger);
    }

    .badge--medium {
      background: color-mix(in srgb, var(--warning) 16%, transparent);
      color: var(--warning);
    }

    .badge--low {
      background: color-mix(in srgb, var(--accent) 16%, transparent);
      color: var(--accent);
    }
  `,
})
export class PriorityBadge {
  readonly priority = input.required<TaskPriority>();

  protected readonly label = computed(() => TASK_PRIORITY_LABELS[this.priority()]);
}
