import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { BehaviorSubject, filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteEventsService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _previousRoutePath = new BehaviorSubject<string>('');

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _router: Router) {
    this._previousRoutePath.next('');

    this._router.events
      .pipe(
        filter((e) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((event: any[]) => {
        this._previousRoutePath.next(event[0].urlAfterRedirects);
      });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get previousUrl(): string {
    return this._previousRoutePath.value;
  }
}
