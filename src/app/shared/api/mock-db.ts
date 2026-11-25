import { Injectable } from '@angular/core';
import { STORAGE_PREFIX } from '../config';

@Injectable({ providedIn: 'root' })
export class MockDb {
  async read<T>(table: string): Promise<T | null> {
    await networkDelay();
    const raw = localStorage.getItem(this.key(table));
    return raw === null ? null : (JSON.parse(raw) as T);
  }

  async write<T>(table: string, data: T): Promise<void> {
    await networkDelay();
    localStorage.setItem(this.key(table), JSON.stringify(data));
  }

  private key(table: string): string {
    return `${STORAGE_PREFIX}:${table}`;
  }
}

function networkDelay(): Promise<void> {
  const ms = 150 + Math.random() * 250;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
