export class Language {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _id!: string;
  private _cultureInfo!: string;
  private _displayValue!: string;
  private _shortcutValue!: string;
  private _flagEmoji!: string;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get id(): string {
    return this._id;
  }

  public get cultureInfo(): string {
    return this._cultureInfo;
  }

  public get displayValue(): string {
    return this._displayValue;
  }

  public get shortcutValue(): string {
    return this._shortcutValue;
  }

  public get flagEmoji(): string {
    return this._flagEmoji;
  }
}
