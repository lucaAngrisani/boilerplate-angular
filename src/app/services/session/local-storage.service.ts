import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public save(key: string, object: unknown): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public load<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : null;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
