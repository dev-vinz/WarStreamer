import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DependencyHelper } from '../utils/DependencyHelper';

import { Request } from './Request';

export class DeleteRequest<T> extends Request<T> {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _http: HttpClient;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(uri: string) {
    super(uri);

    // Tools
    {
      this._http = DependencyHelper.httpClient;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROTECTED                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  protected newRequest(): (url: string, token: string) => Observable<T> {
    return (url: string, token: string) =>
      this._http.delete<T>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  }
}
