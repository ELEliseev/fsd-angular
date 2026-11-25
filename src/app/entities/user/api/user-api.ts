import { Injectable, inject } from '@angular/core';
import { MockDb } from '@shared/api';
import type { User } from '../model/types';
import { createSeedUsers } from './user-seed';

const TABLE = 'users';

@Injectable({ providedIn: 'root' })
export class UserApi {
  private readonly db = inject(MockDb);

  getAll(): readonly User[] {
    const stored = this.db.read<readonly User[]>(TABLE);
    if (stored !== null) {
      return stored;
    }
    const seed = createSeedUsers();
    this.db.write(TABLE, seed);
    return seed;
  }
}
