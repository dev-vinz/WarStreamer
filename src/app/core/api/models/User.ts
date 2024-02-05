export class User {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _id!: string;
  private _languageId!: string;
  private _tierLevel!: number;
  private _newsLetter!: boolean;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get id(): string {
    return this._id;
  }

  public get languageId(): string {
    return this._languageId;
  }

  public get tierLevel(): number {
    return this._tierLevel;
  }

  public get newsLetter(): boolean {
    return this._newsLetter;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set languageId(value: string) {
    this._languageId = value;
  }

  public set newsLetter(value: boolean) {
    this._newsLetter = value;
  }

  public set tierLevel(value: number) {
    this._tierLevel = value;
  }
}
