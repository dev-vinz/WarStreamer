import { GetRequest } from '../http/GetRequest';
import { PostRequest } from '../http/PostRequest';
import { Request } from '../http/Request';

import { ClashPlayer } from '../models/ClashPlayer';
import { ClashToken } from '../models/ClashToken';

import { Requests } from './Requests';

export class ClashPlayerRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public get(tag: string): Request<ClashPlayer> {
    return new GetRequest<ClashPlayer>(
      this.url('coc.player.get', encodeURIComponent(tag))
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public verify(tag: string, token: string): Request<ClashToken> {
    return new PostRequest<string, ClashToken>(
      this.url('coc.player.verify', encodeURIComponent(tag)),
      `"${token}"`
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */
}
