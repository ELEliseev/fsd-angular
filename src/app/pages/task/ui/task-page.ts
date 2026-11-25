import { Component, OnInit, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentItem, CommentStore } from '@entities/comment';
import { TaskCard, TaskStore, type Task } from '@entities/task';
import { UserAvatar, UserStore, type User } from '@entities/user';
import { AddCommentForm } from '@features/add-comment';
import { DeleteCommentButton } from '@features/delete-comment';
import { UiIcon } from '@shared/ui';

@Component({
  selector: 'task-page',
  imports: [
    RouterLink,
    TaskCard,
    UserAvatar,
    CommentItem,
    AddCommentForm,
    DeleteCommentButton,
    UiIcon,
  ],
  templateUrl: './task-page.html',
  styleUrl: './task-page.scss',
})
export class TaskPage implements OnInit {
  private readonly store = inject(TaskStore);
  private readonly userStore = inject(UserStore);
  private readonly commentStore = inject(CommentStore);

  readonly id = input.required<string>();

  protected readonly task = computed(
    () => this.store.tasks().find((task) => task.id === this.id()) ?? null,
  );

  protected readonly comments = computed(() =>
    this.commentStore.comments().filter((comment) => comment.taskId === this.id()),
  );

  ngOnInit(): void {
    this.store.load();
    this.userStore.load();
    this.commentStore.load();
  }

  protected assigneeOf(task: Task): User | null {
    if (task.assigneeId === null) {
      return null;
    }
    return this.userStore.users().find((user) => user.id === task.assigneeId) ?? null;
  }
}
