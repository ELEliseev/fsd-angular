import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Доска — FSD Tasks',
    loadComponent: () => import('@pages/board').then((m) => m.BoardPage),
  },
  {
    path: 'archive',
    title: 'Архив — FSD Tasks',
    loadComponent: () => import('@pages/archive').then((m) => m.ArchivePage),
  },
  {
    path: 'task/:id',
    title: 'Задача — FSD Tasks',
    loadComponent: () => import('@pages/task').then((m) => m.TaskPage),
  },
  {
    path: 'architecture',
    title: 'Архитектура — FSD Tasks',
    loadComponent: () => import('@pages/architecture').then((m) => m.ArchitecturePage),
  },
  { path: '**', redirectTo: '' },
];
