import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Доска — FSD Tasks',
    loadComponent: () => import('@pages/board').then((m) => m.BoardPage),
  },
  {
    path: 'architecture',
    title: 'Архитектура — FSD Tasks',
    loadComponent: () => import('@pages/architecture').then((m) => m.ArchitecturePage),
  },
  { path: '**', redirectTo: '' },
];
