import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { exceptionUrlLoading } from '../shared/exception.loading';

export const intercept: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const platformId = inject(PLATFORM_ID);

  const loadingService = inject(LoadingService);

  const timestamp: number = new Date().getTime();

  // Generic loading management
  const allowLoading: boolean =
    !exceptionUrlLoading.some((u) => request.url.includes(u)) &&
    request.headers.get('not-show-loading') !== 'true';

  if (allowLoading) {
    loadingService.setLoading(true, `${request.url}?${timestamp}`);
  }

  // TOKEN TO INSERT HERE

  return next(request).pipe(
    // TIMEOUT TO INSERT HERE
    //timeout(Number(defaultTimeout)),
    catchError((error: HttpErrorResponse) => {
      // Svuotare sessionStorage se errore 401
      if (error.status === 401) {
        if (isPlatformBrowser(platformId)) {
          // TOKEN TO REMOVE HERE
          //sessionStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
        }
      }
      return throwError(() => error);
    }),
    finalize(() => {
      if (allowLoading) {
        loadingService.setLoading(false, `${request.url}?${timestamp}`);
      }
    }),
  );
};
