import { Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_ORDER,
  type Task,
  type TaskPriority,
} from '@entities/task';
import { UiButton, UiInput, UiSelect, type UiSelectOption } from '@shared/ui';
import { EditTask } from '../model/edit-task';

@Component({
  selector: 'edit-task-form',
  imports: [UiButton, UiInput, UiSelect],
  templateUrl: './edit-task-form.html',
  styleUrl: './edit-task-form.scss',
})
export class EditTaskForm {
  private readonly editTask = inject(EditTask);

  readonly task = input.required<Task>();
  readonly saved = output<void>();
  readonly cancelled = output<void>();

  protected readonly title = linkedSignal(() => this.task().title);
  protected readonly description = linkedSignal(() => this.task().description);
  protected readonly priority = linkedSignal(() => this.task().priority);

  protected readonly priorityOptions: readonly UiSelectOption[] = TASK_PRIORITY_ORDER.map(
    (priority) => ({ value: priority, label: TASK_PRIORITY_LABELS[priority] }),
  );

  protected readonly canSubmit = computed(() => this.title().trim() !== '');

  protected setPriority(value: string): void {
    this.priority.set(value as TaskPriority);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.canSubmit()) {
      return;
    }
    this.editTask.execute(this.task(), {
      title: this.title(),
      description: this.description(),
      priority: this.priority(),
    });
    this.saved.emit();
  }
}
