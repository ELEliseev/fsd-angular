import { Component, signal } from '@angular/core';
import { CreateTaskForm } from '@features/create-task';
import { FilterTasksBar } from '@features/filter-tasks';
import { UiButton, UiIcon } from '@shared/ui';

@Component({
  selector: 'board-toolbar',
  imports: [FilterTasksBar, CreateTaskForm, UiButton, UiIcon],
  templateUrl: './board-toolbar.html',
  styleUrl: './board-toolbar.scss',
})
export class BoardToolbar {
  protected readonly creating = signal(false);
}
