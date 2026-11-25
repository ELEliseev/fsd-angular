import type { User } from '@entities/user/@x/task';

export type TaskStatus = 'backlog' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User | null;
  createdAt: string;
}

export type NewTask = Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'assignee'>;
