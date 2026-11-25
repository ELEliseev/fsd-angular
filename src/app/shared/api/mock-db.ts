import { Injectable } from '@angular/core';
import { STORAGE_PREFIX } from '../config';

@Injectable({ providedIn: 'root' })
export class MockDb {
  read<T>(table: string): T | null {
    const raw = localStorage.getItem(this.key(table));
    return raw === null ? null : (JSON.parse(raw) as T);
  }

  write<T>(table: string, data: T): void {
    localStorage.setItem(this.key(table), JSON.stringify(data));
  }

  private key(table: string): string {
    return `${STORAGE_PREFIX}:${table}`;
  }
}
