import { Component, computed, inject, input } from '@angular/core';
import { TASK_STATUS_LABELS, type Task } from '@entities/task';
import { UiIcon, UiIconButton } from '@shared/ui';
import { MoveTask, adjacentStatus, type MoveDirection } from '../model/move-task';

@Component({
  selector: 'move-task-buttons',
  imports: [UiIcon, UiIconButton],
  templateUrl: './move-task-buttons.html',
  styleUrl: './move-task-buttons.scss',
})
export class MoveTaskButtons {
  private readonly moveTask = inject(MoveTask);

  readonly task = input.required<Task>();

  protected readonly prevStatus = computed(() => adjacentStatus(this.task().status, 'prev'));
  protected readonly nextStatus = computed(() => adjacentStatus(this.task().status, 'next'));

  protected readonly prevLabel = computed(() => {
    const status = this.prevStatus();
    return status === null ? 'Некуда двигать' : `Перенести в «${TASK_STATUS_LABELS[status]}»`;
  });

  protected readonly nextLabel = computed(() => {
    const status = this.nextStatus();
    return status === null ? 'Некуда двигать' : `Перенести в «${TASK_STATUS_LABELS[status]}»`;
  });

  protected move(direction: MoveDirection): void {
    this.moveTask.execute(this.task(), direction);
  }
}
