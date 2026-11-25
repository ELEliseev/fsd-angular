import { Component, OnInit, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentItem, CommentStore } from '@entities/comment';
import { TaskCard, TaskStore } from '@entities/task';
import { AddCommentForm } from '@features/add-comment';
import { DeleteCommentButton } from '@features/delete-comment';
import { UiIcon } from '@shared/ui';

@Component({
  selector: 'task-page',
  imports: [RouterLink, TaskCard, CommentItem, AddCommentForm, DeleteCommentButton, UiIcon],
  templateUrl: './task-page.html',
  styleUrl: './task-page.scss',
})
export class TaskPage implements OnInit {
  private readonly store = inject(TaskStore);
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
    this.commentStore.load();
  }
}
