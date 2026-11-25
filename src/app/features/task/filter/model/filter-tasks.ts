import type { Task, TaskPriority } from '@entities/task';

export interface TaskFilter {
  query: string;
  priority: TaskPriority | 'all';
}

export function filterTasks(tasks: readonly Task[], filter: TaskFilter): readonly Task[] {
  const query = filter.query.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    const matchesQuery =
      query === '' ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);
    return matchesPriority && matchesQuery;
  });
}
