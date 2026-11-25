import { Component, computed, input } from '@angular/core';
import { formatShortDate } from '@shared/lib';
import type { Comment } from '../model/types';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss',
})
export class CommentItem {
  readonly comment = input.required<Comment>();

  protected readonly createdAt = computed(() => formatShortDate(this.comment().createdAt));
}
