import { GetRequest } from '../http/GetRequest';
import { Request } from '../http/Request';

import { ClashClan } from '../models/ClashClan';

import { Requests } from './Requests';

export class ClashClanRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public get(nameOrTag: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get', encodeURIComponent(nameOrTag))
    );
  }

  public getByTag(tag: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get.byTag', encodeURIComponent(tag))
    );
  }

  public getByName(name: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get.byName', encodeURIComponent(name))
    );
  }

  public getWar(tag: string): Request<ClashClan> {
    return new GetRequest<ClashClan>(
      this.url('coc.clan.get.war', encodeURIComponent(tag))
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
