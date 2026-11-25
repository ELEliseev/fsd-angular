import type { Comment } from '../model/types';

const DAY_MS = 86_400_000;

export function createSeedComments(): readonly Comment[] {
  const now = Date.now();
  const daysAgo = (days: number) => new Date(now - days * DAY_MS).toISOString();

  return [
    {
      id: 'c1',
      taskId: 'seed-3',
      text: 'Фильтр работает, осталось покрыть тестами комбинации приоритетов.',
      createdAt: daysAgo(2),
    },
    {
      id: 'c2',
      taskId: 'seed-3',
      text: 'Состояние фильтра живёт в фиче — стор сущности не трогаем.',
      createdAt: daysAgo(1),
    },
    {
      id: 'c3',
      taskId: 'seed-4',
      text: 'Главное: export * в публичном API запрещён, только явные ре-экспорты.',
      createdAt: daysAgo(1),
    },
  ];
}
