import { GetRequest } from '../http/GetRequest';
import { Request } from '../http/Request';

import { Language } from '../models/Language';

import { Requests } from './Requests';

export class LanguageRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<Language[]> {
    return new GetRequest<Language[]>(
      this.url('languages'),
      Requests._createLanguageInstances
    );
  }

  public get(id: string): Request<Language> {
    return new GetRequest<Language>(
      this.url('languages.get', encodeURIComponent(id)),
      Requests._createLanguageInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */
}
