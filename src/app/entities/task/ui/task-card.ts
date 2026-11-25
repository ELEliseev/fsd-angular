import { Component, computed, input } from '@angular/core';
import { UserAvatar } from '@entities/user/@x/task';
import { formatShortDate } from '@shared/lib';
import type { Task } from '../model/types';
import { PriorityBadge } from './priority-badge';

@Component({
  selector: 'task-card',
  imports: [PriorityBadge, UserAvatar],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  readonly task = input.required<Task>();

  protected readonly createdAt = computed(() => formatShortDate(this.task().createdAt));
}
