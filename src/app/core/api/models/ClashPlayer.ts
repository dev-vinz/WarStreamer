import { ClashClan } from './ClashClan';

export class ClashPlayer {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _tag!: string;
  private _name!: string;
  private _townHallLevel!: number;
  private _clan!: ClashClan;

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

  public get townHallLevel(): number {
    return this._townHallLevel;
  }

  public get clan(): ClashClan {
    return this._clan;
  }
}
