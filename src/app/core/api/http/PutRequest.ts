import { HttpClient } from '@angular/common/http';

import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';

import { DependencyHelper } from '../utils/DependencyHelper';

import { Request } from './Request';

export class PutRequest<TRequest, TResponse> extends Request<TResponse> {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _http: HttpClient;
  private _body: TRequest;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(uri: string, body: TRequest) {
    super(uri);

    // Inputs
    {
      this._body = body;
    }

    // Tools
    {
      this._http = DependencyHelper.httpClient;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROTECTED                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  protected newRequest(): (
    url: string,
    token: string
  ) => Observable<TResponse> {
    return (url: string, token: string) =>
      this._http.put<TResponse>(url, this._putBody, {
        headers: {
          'Content-Type': this._contentType,
          Authorization: `Bearer ${token}`,
        },
      });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _contentType(): string {
    return this._body instanceof FormData
      ? 'multipart/form-data'
      : 'application/json';
  }

  private get _putBody(): any {
    return this._body instanceof FormData
      ? this._body
      : instanceToPlain(this._body);
  }
}
