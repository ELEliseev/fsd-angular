import { Component, inject, input, signal } from '@angular/core';
import type { Task } from '@entities/task';
import { UiIcon, UiIconButton } from '@shared/ui';
import { DeleteTask } from '../model/delete-task';

@Component({
  selector: 'delete-task-button',
  imports: [UiIcon, UiIconButton],
  templateUrl: './delete-task-button.html',
  styleUrl: './delete-task-button.scss',
})
export class DeleteTaskButton {
  private readonly deleteTask = inject(DeleteTask);

  readonly task = input.required<Task>();

  protected readonly armed = signal(false);

  protected confirm(): void {
    if (!this.armed()) {
      this.armed.set(true);
      return;
    }
    this.armed.set(false);
    void this.deleteTask.execute(this.task().id);
  }

  protected reset(): void {
    this.armed.set(false);
  }
}
