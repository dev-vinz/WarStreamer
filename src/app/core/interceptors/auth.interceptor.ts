import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, catchError, from, switchMap, throwError } from 'rxjs';

import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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
        // Verify that the error is an unauthorized error and that the request is not a refresh request
        if (error.status === 401 && !request.url.endsWith('/auth/refresh')) {
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
}
