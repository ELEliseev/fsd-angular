import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { TaskCard, TaskStore } from '@entities/task';
import { UserStore } from '@entities/user';
import { AssignTaskControl } from '@features/assign-task';
import { DeleteTaskButton } from '@features/delete-task';
import { EditTaskForm } from '@features/edit-task';
import { FilterTasksBar, FilterTasksStore, filterTasks } from '@features/filter-tasks';
import { MoveTaskButtons } from '@features/move-task';
import { UiIcon, UiIconButton } from '@shared/ui';

@Component({
  selector: 'archive-page',
  imports: [
    TaskCard,
    FilterTasksBar,
    MoveTaskButtons,
    DeleteTaskButton,
    EditTaskForm,
    AssignTaskControl,
    UiIcon,
    UiIconButton,
  ],
  templateUrl: './archive-page.html',
  styleUrl: './archive-page.scss',
})
export class ArchivePage implements OnInit {
  private readonly store = inject(TaskStore);
  private readonly userStore = inject(UserStore);
  private readonly filterStore = inject(FilterTasksStore);

  protected readonly editingId = signal<string | null>(null);

  protected readonly doneTasks = computed(() =>
    filterTasks(
      this.store.tasks().filter((task) => task.status === 'done'),
      this.filterStore.filter(),
    ),
  );

  ngOnInit(): void {
    this.store.load();
    this.userStore.load();
  }
}
