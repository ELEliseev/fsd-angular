import { Component, computed, inject, output, signal } from '@angular/core';
import { TASK_PRIORITY_LABELS, TASK_PRIORITY_ORDER, type TaskPriority } from '@entities/task';
import { UiButton, UiInput, UiSelect, type UiSelectOption } from '@shared/ui';
import { CreateTask } from '../model/create-task';

@Component({
  selector: 'create-task-form',
  imports: [UiButton, UiInput, UiSelect],
  templateUrl: './create-task-form.html',
  styleUrl: './create-task-form.scss',
})
export class CreateTaskForm {
  private readonly createTask = inject(CreateTask);

  readonly created = output<void>();
  readonly cancelled = output<void>();

  protected readonly title = signal('');
  protected readonly description = signal('');
  protected readonly priority = signal<TaskPriority>('medium');

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
    this.createTask.execute({
      title: this.title(),
      description: this.description(),
      priority: this.priority(),
      status: 'backlog',
    });
    this.title.set('');
    this.description.set('');
    this.priority.set('medium');
    this.created.emit();
  }
}
