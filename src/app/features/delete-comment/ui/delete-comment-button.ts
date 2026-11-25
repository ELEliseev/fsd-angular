import { Component, inject, input, signal } from '@angular/core';
import type { Comment } from '@entities/comment';
import { UiIcon, UiIconButton } from '@shared/ui';
import { DeleteComment } from '../model/delete-comment';

@Component({
  selector: 'delete-comment-button',
  imports: [UiIcon, UiIconButton],
  templateUrl: './delete-comment-button.html',
  styleUrl: './delete-comment-button.scss',
})
export class DeleteCommentButton {
  private readonly deleteComment = inject(DeleteComment);

  readonly comment = input.required<Comment>();

  protected readonly armed = signal(false);

  protected confirm(): void {
    if (!this.armed()) {
      this.armed.set(true);
      return;
    }
    this.armed.set(false);
    this.deleteComment.execute(this.comment().id);
  }

  protected reset(): void {
    this.armed.set(false);
  }
}
