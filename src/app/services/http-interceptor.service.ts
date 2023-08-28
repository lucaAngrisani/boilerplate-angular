import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { exceptionUrlLoading } from "src/app/shared/exception.loading";
import { LoadingService } from "./loading.service";

@Injectable()
export class HttpInterceptorService {

  constructor(
    private loadingService: LoadingService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timestamp: number = new Date().getTime();
    /**
     * Generic loading management
     */
    let allowLoading: boolean = !(
      request.headers.get("notShowLoading") == "true"
    );
    if (
      allowLoading &&
      !exceptionUrlLoading.some((url: string) => request.url.includes(url))
    ) {
      this.loadingService.setLoading(true, request.url + timestamp);

      /**
       * IN CASE NEED TO BLUR AFTER LOGIN
       * let activeElement: any = document.activeElement;
       * if (activeElement) activeElement.blur();
       */
    }

    /** TOKEN STUFFS HERE */

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          /** RESPONSE */
        }
      }),
      catchError((error: HttpErrorResponse) => {
        /** CATCH ERROR */
        throw Error(error.message);
      }),
      finalize(() => {
        if (allowLoading) this.loadingService.setLoading(false, request.url + timestamp);
      })
    );
  }
}
