import type { TaskPriority, TaskStatus } from './types';

export const TASK_STATUS_ORDER: readonly TaskStatus[] = ['backlog', 'in-progress', 'done'];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: 'Бэклог',
  'in-progress': 'В работе',
  done: 'Готово',
};

export const TASK_PRIORITY_ORDER: readonly TaskPriority[] = ['high', 'medium', 'low'];

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
};
