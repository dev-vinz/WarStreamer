import { DeleteRequest } from '../http/DeleteRequest';
import { GetRequest } from '../http/GetRequest';
import { PostRequest } from '../http/PostRequest';
import { PutRequest } from '../http/PutRequest';
import { Request } from '../http/Request';

import { WarOverlay } from '../models/WarOverlay';

import { Requests } from './Requests';

export class WarOverlayRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<WarOverlay[]> {
    return new GetRequest<WarOverlay[]>(this.url('waroverlays'));
  }

  public get(id: number): Request<WarOverlay> {
    return new GetRequest<WarOverlay>(this.url('waroverlays.get', id));
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(overlay: WarOverlay): Request<WarOverlay> {
    return new PostRequest<WarOverlay, WarOverlay>(
      this.url('waroverlays'),
      overlay
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(id: number, overlay: WarOverlay): Request<boolean> {
    return new PutRequest<WarOverlay, boolean>(
      this.url('waroverlays.get', id),
      overlay
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(id: number): Request<boolean> {
    return new DeleteRequest<boolean>(this.url('waroverlays.get', id));
  }
}
