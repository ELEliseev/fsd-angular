import { Component, computed, inject, input } from '@angular/core';
import type { Task } from '@entities/task';
import { UserStore } from '@entities/user';
import { UiSelect, type UiSelectOption } from '@shared/ui';
import { AssignTask } from '../model/assign-task';

@Component({
  selector: 'assign-task-control',
  imports: [UiSelect],
  template: `
    <ui-select [options]="options()" [value]="value()" (valueChange)="onChange($event)" />
  `,
  styles: `
    :host {
      display: block;
      width: 9.5rem;
    }
  `,
})
export class AssignTaskControl {
  private readonly assignTask = inject(AssignTask);
  private readonly userStore = inject(UserStore);

  readonly task = input.required<Task>();

  protected readonly options = computed<readonly UiSelectOption[]>(() => [
    { value: '', label: 'Без исполнителя' },
    ...this.userStore.users().map((user) => ({ value: user.id, label: user.name })),
  ]);

  protected readonly value = computed(() => this.task().assignee?.id ?? '');

  protected onChange(id: string): void {
    const assignee =
      id === '' ? null : (this.userStore.users().find((user) => user.id === id) ?? null);
    this.assignTask.execute(this.task(), assignee);
  }
}
