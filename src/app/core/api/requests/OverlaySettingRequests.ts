import { DeleteRequest } from '../http/DeleteRequest';
import { GetRequest } from '../http/GetRequest';
import { PostRequest } from '../http/PostRequest';
import { PutRequest } from '../http/PutRequest';
import { Request } from '../http/Request';

import { Image } from '../models/Image';
import { OverlaySetting } from '../models/OverlaySetting';

import { Requests } from './Requests';

export class OverlaySettingRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public get(): Request<OverlaySetting> {
    return new GetRequest<OverlaySetting>(
      this.url('overlay'),
      Requests._createOverlaySettingInstance
    );
  }

  public getImages(): Request<Image[]> {
    return new GetRequest<Image[]>(
      this.url('overlay.images'),
      Requests._createImageInstances
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(setting: OverlaySetting): Request<OverlaySetting> {
    return new PostRequest<OverlaySetting, OverlaySetting>(
      this.url('overlay'),
      setting,
      Requests._createOverlaySettingInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(setting: OverlaySetting): Request<boolean> {
    return new PutRequest<OverlaySetting, boolean>(
      this.url('overlay'),
      setting,
      Requests._createBooleanInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(): Request<boolean> {
    return new DeleteRequest<boolean>(
      this.url('overlay'),
      Requests._createBooleanInstance
    );
  }
}
