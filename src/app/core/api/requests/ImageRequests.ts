import { DeleteRequest } from '../http/DeleteRequest';
import { GetRequest } from '../http/GetRequest';
import { PostRequest } from '../http/PostRequest';
import { PutRequest } from '../http/PutRequest';
import { Request } from '../http/Request';

import { Image } from '../models/Image';

import { Requests } from './Requests';

export class ImageRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<Image[]> {
    return new GetRequest<Image[]>(
      this.url('images'),
      Requests._createImageInstances
    );
  }

  public get(name: string): Request<Image> {
    return new GetRequest<Image>(
      this.url('images.get', encodeURIComponent(name)),
      Requests._createImageInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(image: Image): Request<Image> {
    return new PostRequest<FormData, Image>(
      this.url('images'),
      image.exportAsFormData(),
      Requests._createImageInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(name: string, image: Image): Request<boolean> {
    return new PutRequest<FormData, boolean>(
      this.url('images.get', encodeURIComponent(name)),
      image.exportAsFormData(),
      Requests._createBooleanInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(name: string): Request<boolean> {
    return new DeleteRequest<boolean>(
      this.url('images.get', encodeURIComponent(name)),
      Requests._createBooleanInstance
    );
  }
}
