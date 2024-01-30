import { Observable, firstValueFrom } from 'rxjs';

import { DependencyHelper } from '../utils/DependencyHelper';

export abstract class Request<T> {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _uri: string;
  private _token: string;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(uri: string) {
    // Inputs
    {
      this._uri = uri;
    }

    // Tools
    {
      const authService = DependencyHelper.authService;
      this._token = authService.accessToken;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async execute(): Promise<T> {
    return await firstValueFrom(this.newRequest()(this._uri, this._token));
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROTECTED                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  protected abstract newRequest(): (
    url: string,
    token: string
  ) => Observable<T>;
}
