import { GetRequest } from '../http/GetRequest';
import { Request } from '../http/Request';

import { ClashClan } from '../models/ClashClan';

import { Requests } from './Requests';

export class ClashClanRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public get(nameOrTag: string): Request<ClashClan[]> {
    return new GetRequest<ClashClan[]>(
      this.url('coc.clan.get', encodeURIComponent(nameOrTag)),
      Requests._createClashClanInstances
    );
  }

  public getByTag(tag: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get.byTag', encodeURIComponent(tag)),
      Requests._createClashClanInstance
    );
  }

  public getByName(name: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get.byName', encodeURIComponent(name)),
      Requests._createClashClanInstance
    );
  }

  public getWar(tag: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get.war', encodeURIComponent(tag)),
      Requests._createClashClanInstance
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
