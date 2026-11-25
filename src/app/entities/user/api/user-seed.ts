import type { User } from '../model/types';

export function createSeedUsers(): readonly User[] {
  return [
    { id: 'u1', name: 'Андрей', color: '#8b96f8' },
    { id: 'u2', name: 'Мария', color: '#34d399' },
    { id: 'u3', name: 'Олег', color: '#fbbf24' },
  ];
}
