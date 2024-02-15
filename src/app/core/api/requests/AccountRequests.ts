import { DeleteRequest } from '../http/DeleteRequest';
import { GetRequest } from '../http/GetRequest';
import { PostRequest } from '../http/PostRequest';
import { Request } from '../http/Request';

import { Account } from '../models/Account';

import { Requests } from './Requests';

export class AccountRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public getAll(): Request<Account[]> {
    return new GetRequest<Account[]>(
      this.url('accounts'),
      Requests._createAccountInstances
    );
  }

  public get(tag: string): Request<Account> {
    return new GetRequest<Account>(
      this.url('accounts.get', encodeURIComponent(tag)),
      Requests._createAccountInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  public add(account: Account): Request<Account> {
    return new PostRequest<Account, Account>(
      this.url('accounts'),
      account,
      Requests._createAccountInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(tag: string): Request<boolean> {
    return new DeleteRequest<boolean>(
      this.url('accounts.get', encodeURIComponent(tag)),
      Requests._createBooleanInstance
    );
  }
}
