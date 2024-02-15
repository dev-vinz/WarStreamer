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
    return new GetRequest<TeamLogo[]>(
      this.url('teamlogos'),
      Requests._createTeamLogoInstances
    );
  }

  public get(name: string): Request<TeamLogo> {
    return new GetRequest<TeamLogo>(
      this.url('teamlogos.get', name),
      Requests._createTeamLogoInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(logo: TeamLogo): Request<TeamLogo> {
    return new PostRequest<FormData, TeamLogo>(
      this.url('teamlogos'),
      logo.exportAsFormData(),
      Requests._createTeamLogoInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(name: string, logo: TeamLogo): Request<boolean> {
    return new PutRequest<FormData, boolean>(
      this.url('teamlogos.get', name),
      logo.exportAsFormData(),
      Requests._createBooleanInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(name: string): Request<boolean> {
    return new DeleteRequest<boolean>(
      this.url('teamlogos.get', name),
      Requests._createBooleanInstance
    );
  }
}
