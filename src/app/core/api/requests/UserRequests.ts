import { DeleteRequest } from '../http/DeleteRequest';
import { GetRequest } from '../http/GetRequest';
import { PutRequest } from '../http/PutRequest';
import { Request } from '../http/Request';

import { Language } from '../models/Language';
import { User } from '../models/User';

import { Requests } from './Requests';

export class UserRequests extends Requests {
  /* * * * * * * * * * * * * * * *\
  |*             GET             *|
  \* * * * * * * * * * * * * * * */

  public get(): Request<User> {
    return new GetRequest<User>(this.url('user'), Requests._createUserInstance);
  }

  public getLanguage(): Request<Language> {
    return new GetRequest<Language>(
      this.url('user.language'),
      Requests._createLanguageInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*             POST            *|
  \* * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*             PUT             *|
  \* * * * * * * * * * * * * * * */

  public update(user: User): Request<boolean> {
    return new PutRequest<User, boolean>(
      this.url('user'),
      user,
      Requests._createBooleanInstance
    );
  }

  /* * * * * * * * * * * * * * * *\
  |*            DELETE           *|
  \* * * * * * * * * * * * * * * */

  public delete(): Request<boolean> {
    return new DeleteRequest<boolean>(
      this.url('user'),
      Requests._createBooleanInstance
    );
  }
}
