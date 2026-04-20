import { Injectable, computed, signal } from '@angular/core';

/**
 * Loading service
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly loadingMap = signal<Map<string, boolean>>(new Map());
  readonly isLoading = computed(() => this.loadingMap().size > 0);

  setLoading(loading: boolean, url: string): void {
    if (!url) throw new Error('An url occurred');

    this.loadingMap.update((map) => {
      const next = new Map(map);
      if (loading) {
        next.set(url, true);
      } else {
        next.delete(url);
      }
      return next;
    });
  }
}