import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TaskCard, TaskStore, type Task } from '@entities/task';
import { UserAvatar, UserStore, type User } from '@entities/user';
import { AssignTaskControl } from '@features/task/assign';
import { DeleteTaskButton } from '@features/task/delete';
import { EditTaskForm } from '@features/task/edit';
import { FilterTasksBar, FilterTasksStore, filterTasks } from '@features/task/filter';
import { MoveTaskButtons } from '@features/task/move';
import { UiIcon, UiIconButton } from '@shared/ui';

@Component({
  selector: 'archive-page',
  imports: [
    TaskCard,
    UserAvatar,
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
  private readonly router = inject(Router);
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

  protected openTask(id: string): void {
    void this.router.navigate(['/task', id]);
  }

  protected assigneeOf(task: Task): User | null {
    if (task.assigneeId === null) {
      return null;
    }
    return this.userStore.users().find((user) => user.id === task.assigneeId) ?? null;
  }
}
