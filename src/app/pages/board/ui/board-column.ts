import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TASK_STATUS_LABELS, TaskCard, type Task, type TaskStatus } from '@entities/task';
import { UserAvatar, UserStore, type User } from '@entities/user';
import { AssignTaskControl } from '@features/task/assign';
import { DeleteTaskButton } from '@features/task/delete';
import { EditTaskForm } from '@features/task/edit';
import { MoveTaskButtons } from '@features/task/move';
import { UiIcon, UiIconButton } from '@shared/ui';

@Component({
  selector: 'board-column',
  imports: [
    TaskCard,
    UserAvatar,
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
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  readonly status = input.required<TaskStatus>();
  readonly tasks = input.required<readonly Task[]>();

  protected readonly editingId = signal<string | null>(null);
  protected readonly label = computed(() => TASK_STATUS_LABELS[this.status()]);

  protected assigneeOf(task: Task): User | null {
    if (task.assigneeId === null) {
      return null;
    }
    return this.userStore.users().find((user) => user.id === task.assigneeId) ?? null;
  }

  protected openTask(id: string): void {
    void this.router.navigate(['/task', id]);
  }
}
