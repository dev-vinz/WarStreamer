import { Expose } from 'class-transformer';

export class User {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Expose({ name: 'id' })
  private _id: string;

  @Expose({ name: 'languageId' })
  private _languageId: string;

  @Expose({ name: 'tierLevel' })
  private _tierLevel: number;

  @Expose({ name: 'newsLetter' })
  private _newsLetter: boolean;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    id: string,
    languageId: string,
    tierLevel: number,
    newsLetter: boolean
  ) {
    // Inputs
    {
      this._id = id;
      this._languageId = languageId;
      this._tierLevel = tierLevel;
      this._newsLetter = newsLetter;
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
