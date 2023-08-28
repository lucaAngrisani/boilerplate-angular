import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Loading service
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {

  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  setLoading(caricamento: boolean, url: string): void {
    if (!url)
      throw new Error('An url occurred');

    if (caricamento === true) {
      this.loadingMap.set(url, caricamento);
      this.loadingSub.next(true);
    }
    else if (caricamento === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size === 0)
      this.loadingSub.next(false);

  }

}