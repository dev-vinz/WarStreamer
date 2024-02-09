import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import {
  Observable,
  catchError,
  from,
  switchMap,
  take,
  throwError,
  timer,
} from 'rxjs';

import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _storageKey = 'auth';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _authService: AuthService) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Get the refresh flag from the local storage
        const refresh = localStorage.getItem(this._storageKey) === 'true';

        // If the refresh flag is set, retry the same request (wait)
        if (refresh) {
          return this._retryRequest(request, next);
        }

        // Verify that the error is an unauthorized error and that the request is not a refresh request
        if (error.status === 401 && !request.url.endsWith('/auth/refresh')) {
          // Set the refresh flag to true
          localStorage.setItem(this._storageKey, 'true');

          // Refresh the token
          return from(this._authService.refresh()).pipe(
            switchMap((refreshed: boolean) => {
              if (refreshed) {
                // Reload user informations
                this._authService.fetchDiscordUserProfile();

                // Clone the request with the new token
                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this._authService.accessToken}`,
                  },
                });

                // Erase the refresh flag
                localStorage.removeItem(this._storageKey);

                return next.handle(newRequest);
              } else {
                // Refresh failed, disconnect the user and return the error
                this._authService.disconnect();

                return throwError(() => error);
              }
            })
          );
        }

        // Otherwise return the error
        return throwError(() => error);
      })
    );
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _retryRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${this._authService.accessToken}`,
          },
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Sleep 5 seconds
            return this._sleep(5000).pipe(
              switchMap(() => {
                // Retry the request
                return this._retryRequest(request, next);
              })
            );
          } else {
            return throwError(() => error);
          }
        })
      );
  }

  private _sleep(ms: number): Observable<0> {
    return timer(ms).pipe(take(1));
  }
}
