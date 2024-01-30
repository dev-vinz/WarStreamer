import { GetRequest } from '../http/GetRequest';
import { Request } from '../http/Request';

import { Font } from '../models/Font';

import { Requests } from './Requests';

export class FontRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<Font[]> {
    return new GetRequest<Font[]>(this.url('fonts'));
  }

  public get(id: string): Request<Font> {
    return new GetRequest<Font>(this.url('fonts.get', encodeURIComponent(id)));
  }

  public getFile(id: string): Request<Blob> {
    return new GetRequest<Blob>(
      this.url('fonts.get.file', encodeURIComponent(id))
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
