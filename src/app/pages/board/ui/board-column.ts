import { Component, computed, input, signal } from '@angular/core';
import { TASK_STATUS_LABELS, TaskCard, type Task, type TaskStatus } from '@entities/task';
import { AssignTaskControl } from '@features/assign-task';
import { DeleteTaskButton } from '@features/delete-task';
import { EditTaskForm } from '@features/edit-task';
import { MoveTaskButtons } from '@features/move-task';
import { UiIcon, UiIconButton } from '@shared/ui';

@Component({
  selector: 'board-column',
  imports: [
    TaskCard,
    MoveTaskButtons,
    DeleteTaskButton,
    EditTaskForm,
    AssignTaskControl,
    UiIcon,
    UiIconButton,
  ],
  templateUrl: './board-column.html',
  styleUrl: './board-column.scss',
})
export class BoardColumn {
  readonly status = input.required<TaskStatus>();
  readonly tasks = input.required<readonly Task[]>();

  protected readonly editingId = signal<string | null>(null);
  protected readonly label = computed(() => TASK_STATUS_LABELS[this.status()]);
}
