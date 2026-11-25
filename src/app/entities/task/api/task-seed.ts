import type { Task } from '../model/types';

const DAY_MS = 86_400_000;

export function createSeedTasks(): readonly Task[] {
  const now = Date.now();
  const daysAgo = (days: number) => new Date(now - days * DAY_MS).toISOString();

  return [
    {
      id: 'seed-1',
      title: 'Изучить правило импортов между слоями',
      description: 'Модуль слайса импортирует только слои строго ниже себя.',
      status: 'done',
      priority: 'high',
      createdAt: daysAgo(6),
    },
    {
      id: 'seed-2',
      title: 'Собрать канбан-доску на signals',
      description: 'Колонки, карточки и статистика без zone.js.',
      status: 'done',
      priority: 'medium',
      createdAt: daysAgo(5),
    },
    {
      id: 'seed-3',
      title: 'Добавить фильтр по приоритету',
      description: 'Состояние фильтра принадлежит фиче filter-tasks, а не сущности.',
      status: 'in-progress',
      priority: 'high',
      createdAt: daysAgo(3),
    },
    {
      id: 'seed-4',
      title: 'Прочитать про public API и @x',
      description: 'index.ts с явными ре-экспортами, cross-imports между entities.',
      status: 'in-progress',
      priority: 'low',
      createdAt: daysAgo(2),
    },
    {
      id: 'seed-5',
      title: 'Придумать фичу edit-task',
      description: 'Упражнение: добавь редактирование задачи отдельным слайсом в features.',
      status: 'backlog',
      priority: 'medium',
      createdAt: daysAgo(1),
    },
    {
      id: 'seed-6',
      title: 'Написать тесты для стора',
      description: 'TaskStore покрывается юнит-тестами с моком TaskApi.',
      status: 'backlog',
      priority: 'low',
      createdAt: daysAgo(1),
    },
  ];
}
