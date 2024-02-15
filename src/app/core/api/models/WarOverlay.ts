import { Expose } from 'class-transformer';

import moment from 'moment';

export class WarOverlay {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Expose({ name: 'userId' })
  private _userId: string;

  @Expose({ name: 'id' })
  private _id: number;

  @Expose({ name: 'clanTag' })
  private _clanTag: string;

  @Expose({ name: 'lastCheckout' })
  private _lastCheckout: moment.Moment;

  @Expose({ name: 'isEnded' })
  private _isEnded: boolean;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    userId: string,
    id: number,
    clanTag: string,
    lastCheckout: moment.Moment,
    isEnded: boolean
  ) {
    // Inputs
    {
      this._userId = userId;
      this._id = id;
      this._clanTag = clanTag;
      this._lastCheckout = lastCheckout;
      this._isEnded = isEnded;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get userId(): string {
    return this._userId;
  }

  public get id(): number {
    return this._id;
  }

  public get clanTag(): string {
    return this._clanTag;
  }

  public get lastCheckout(): moment.Moment {
    return this._lastCheckout;
  }

  public get isEnded(): boolean {
    return this._isEnded;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set lastCheckout(value: moment.Moment) {
    this._lastCheckout = value;
  }

  public set isEnded(value: boolean) {
    this._isEnded = value;
  }
}
