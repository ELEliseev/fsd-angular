import { Component, computed, inject, input, signal } from '@angular/core';
import { UiButton, UiInput } from '@shared/ui';
import { AddComment } from '../model/add-comment';

@Component({
  selector: 'add-comment-form',
  imports: [UiButton, UiInput],
  templateUrl: './add-comment-form.html',
  styleUrl: './add-comment-form.scss',
})
export class AddCommentForm {
  private readonly addComment = inject(AddComment);

  readonly taskId = input.required<string>();

  protected readonly text = signal('');
  protected readonly canSubmit = computed(() => this.text().trim() !== '');

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.canSubmit()) {
      return;
    }
    this.addComment.execute({ taskId: this.taskId(), text: this.text() });
    this.text.set('');
  }
}
