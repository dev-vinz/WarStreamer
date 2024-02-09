import { Expose, Type } from 'class-transformer';
import { ClashBadgeUrls } from './ClashBadgeUrls';

export class ClashClan {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _tag!: string;
  private _name!: string;
  private _badgeUrls!: ClashBadgeUrls;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get tag(): string {
    return this._tag;
  }

  public get name(): string {
    return this._name;
  }

  public get badgeUrls(): ClashBadgeUrls {
    return this._badgeUrls;
  }
}
