import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public save(key: string, object: unknown): void {
    sessionStorage.setItem(key, JSON.stringify(object));
  }

  public load<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : null;
  }

  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
