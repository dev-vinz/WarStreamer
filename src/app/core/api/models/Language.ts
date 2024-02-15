export class Language {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _id: string;
  private _cultureInfo: string;
  private _displayValue: string;
  private _shortcutValue: string;
  private _flagEmoji: string;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    id: string,
    cultureInfo: string,
    displayValue: string,
    shortcutValue: string,
    flagEmoji: string
  ) {
    // Inputs
    {
      this._id = id;
      this._cultureInfo = cultureInfo;
      this._displayValue = displayValue;
      this._shortcutValue = shortcutValue;
      this._flagEmoji = flagEmoji;
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
