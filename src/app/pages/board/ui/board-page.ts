import { Component, OnInit, computed, inject } from '@angular/core';
import { TASK_STATUS_ORDER, TaskStore } from '@entities/task';
import { UserStore } from '@entities/user';
import { FilterTasksStore, filterTasks } from '@features/task/filter';
import { BoardColumn } from './board-column';
import { BoardStats } from './board-stats';
import { BoardToolbar } from './board-toolbar';

@Component({
  selector: 'board-page',
  imports: [BoardStats, BoardToolbar, BoardColumn],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
})
export class BoardPage implements OnInit {
  private readonly store = inject(TaskStore);
  private readonly userStore = inject(UserStore);
  private readonly filterStore = inject(FilterTasksStore);

  protected readonly columns = computed(() => {
    const tasks = filterTasks(this.store.tasks(), this.filterStore.filter());
    return TASK_STATUS_ORDER.map((status) => ({
      status,
      tasks: tasks.filter((task) => task.status === status),
    }));
  });

  ngOnInit(): void {
    this.store.load();
    this.userStore.load();
  }
}
