export class DiscordUser {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _id: string;
  private _username: string;
  private _globalName: string;
  private _avatar: string;
  private _email: string;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    id: string,
    username: string,
    globalName: string,
    avatar: string,
    email: string
  ) {
    // Inputs
    {
      this._id = id;
      this._username = username;
      this._globalName = globalName;
      this._avatar = avatar;
      this._email = email;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }

  public get globalName(): string {
    return this._globalName;
  }

  public get avatar(): string {
    return this._avatar;
  }

  public get email(): string {
    return this._email;
  }
}
