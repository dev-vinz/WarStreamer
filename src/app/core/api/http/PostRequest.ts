import { HttpClient, HttpHeaders } from '@angular/common/http';

import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';

import { DependencyHelper } from '../utils/DependencyHelper';

import { Request } from './Request';

export class PostRequest<TRequest, TResponse> extends Request<TResponse> {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _http: HttpClient;
  private _body: TRequest;
  private _buildInstance: (o: any) => TResponse;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    uri: string,
    body: TRequest,
    instanceBuilder: (o: any) => TResponse
  ) {
    super(uri);

    // Inputs
    {
      this._body = body;
      this._buildInstance = instanceBuilder;
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
      this._http
        .post<TResponse>(url, this._postBody, {
          headers: this._generateHeaders(token),
        })
        .pipe(map((response) => this._buildInstance(response)));
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _generateHeaders(token: string): HttpHeaders {
    return this._body instanceof FormData
      ? new HttpHeaders({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _postBody(): any {
    return this._body instanceof FormData
      ? this._body
      : instanceToPlain(this._body);
  }
}
