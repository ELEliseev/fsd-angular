import { Injectable, inject, signal } from '@angular/core';
import { UserApi } from '../api/user-api';
import type { User } from './types';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly api = inject(UserApi);
  private readonly items = signal<readonly User[]>([]);
  private readonly loaded = signal(false);

  readonly users = this.items.asReadonly();

  load(): void {
    if (this.loaded()) {
      return;
    }
    this.items.set(this.api.getAll());
    this.loaded.set(true);
  }
}
