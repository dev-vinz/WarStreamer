import { DeleteRequest } from '../http/DeleteRequest';
import { GetRequest } from '../http/GetRequest';
import { PostRequest } from '../http/PostRequest';
import { PutRequest } from '../http/PutRequest';
import { Request } from '../http/Request';

import { TeamLogo } from '../models/TeamLogo';

import { Requests } from './Requests';

export class TeamLogoRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<TeamLogo[]> {
    return new GetRequest<TeamLogo[]>(this.url('teamlogos'));
  }

  public get(name: string): Request<TeamLogo> {
    return new GetRequest<TeamLogo>(this.url('teamlogos.get', name));
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(logo: TeamLogo): Request<TeamLogo> {
    return new PostRequest<TeamLogo, TeamLogo>(this.url('teamlogos'), logo);
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(name: string, logo: TeamLogo): Request<boolean> {
    return new PutRequest<TeamLogo, boolean>(
      this.url('teamlogos.get', name),
      logo
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(name: string): Request<boolean> {
    return new DeleteRequest<boolean>(this.url('teamlogos.get', name));
  }
}
