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
    return new GetRequest<Image[]>(this.url('images'));
  }

  public get(name: string): Request<Image> {
    return new GetRequest<Image>(
      this.url('images.get', encodeURIComponent(name))
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(image: Image): Request<Image> {
    return new PostRequest<Image, Image>(this.url('images'), image);
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(name: string, image: Image): Request<boolean> {
    return new PutRequest<Image, boolean>(
      this.url('images.get', encodeURIComponent(name)),
      image
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(name: string): Request<boolean> {
    return new DeleteRequest<boolean>(
      this.url('images.get', encodeURIComponent(name))
    );
  }
}
