import { GetRequest } from '../http/GetRequest';
import { Request } from '../http/Request';

import { Font } from '../models/Font';

import { Requests } from './Requests';

export class FontRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<Font[]> {
    return new GetRequest<Font[]>(
      this.url('fonts'),
      Requests._createFontInstances
    );
  }

  public get(id: string): Request<Font> {
    return new GetRequest<Font>(
      this.url('fonts.get', encodeURIComponent(id)),
      Requests._createFontInstance
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
