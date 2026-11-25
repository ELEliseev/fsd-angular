import { Component, computed, input } from '@angular/core';
import { TASK_STATUS_LABELS, TaskCard, type Task, type TaskStatus } from '@entities/task';
import { DeleteTaskButton } from '@features/delete-task';
import { MoveTaskButtons } from '@features/move-task';

@Component({
  selector: 'board-column',
  imports: [TaskCard, MoveTaskButtons, DeleteTaskButton],
  templateUrl: './board-column.html',
  styleUrl: './board-column.scss',
})
export class BoardColumn {
  readonly status = input.required<TaskStatus>();
  readonly tasks = input.required<readonly Task[]>();

  protected readonly label = computed(() => TASK_STATUS_LABELS[this.status()]);
}
