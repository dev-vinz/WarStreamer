export class ClashToken {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _tag: string;
  private _token: string;
  private _status: number;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(tag: string, token: string, status: number) {
    // Inputs
    {
      this._tag = tag;
      this._token = token;
      this._status = status;
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get tag(): string {
    return this._tag;
  }

  public get token(): string {
    return this._token;
  }

  public get status(): number {
    return this._status;
  }

  /* * * * * * * * * * * * * * * * * *\
  |*            SHORTCUTS            *|
  \* * * * * * * * * * * * * * * * * */

  public get isValid(): boolean {
    return this._status === 0;
  }
}
