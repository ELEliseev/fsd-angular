import type { Task } from '@entities/task';
import { filterTasks } from './filter-tasks';

describe('filterTasks', () => {
  const tasks: readonly Task[] = [
    {
      id: '1',
      title: 'Купить молоко',
      description: 'В магазине у дома',
      status: 'backlog',
      priority: 'low',
      assigneeId: null,
      createdAt: '2026-11-20T10:00:00.000Z',
    },
    {
      id: '2',
      title: 'Починить сборку',
      description: 'Упал CI на линтере',
      status: 'in-progress',
      priority: 'high',
      assigneeId: null,
      createdAt: '2026-11-21T10:00:00.000Z',
    },
  ];

  it('без фильтра возвращает все задачи', () => {
    expect(filterTasks(tasks, { query: '', priority: 'all' })).toEqual(tasks);
  });

  it('ищет по названию без учёта регистра', () => {
    expect(filterTasks(tasks, { query: 'МОЛОКО', priority: 'all' })).toEqual([tasks[0]]);
  });

  it('ищет по описанию', () => {
    expect(filterTasks(tasks, { query: 'линтере', priority: 'all' })).toEqual([tasks[1]]);
  });

  it('фильтрует по приоритету', () => {
    expect(filterTasks(tasks, { query: '', priority: 'high' })).toEqual([tasks[1]]);
  });

  it('комбинирует поиск и приоритет', () => {
    expect(filterTasks(tasks, { query: 'сборку', priority: 'high' })).toEqual([tasks[1]]);
    expect(filterTasks(tasks, { query: 'молоко', priority: 'low' })).toEqual([tasks[0]]);
    expect(filterTasks(tasks, { query: 'молоко', priority: 'high' })).toEqual([]);
  });

  it('игнорирует пробелы по краям запроса', () => {
    expect(filterTasks(tasks, { query: '  сборку  ', priority: 'all' })).toEqual([tasks[1]]);
  });
});
