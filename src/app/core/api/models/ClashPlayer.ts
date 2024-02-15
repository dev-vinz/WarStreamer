import { ClashClan } from './ClashClan';
import { ClashHero } from './ClashHero';

export class ClashPlayer {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _tag: string;
  private _name: string;
  private _townHallLevel: number;
  private _heroes: ClashHero[];
  private _clan: ClashClan;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    tag: string,
    name: string,
    townHallLevel: number,
    heroes: ClashHero[],
    clan: ClashClan
  ) {
    // Inputs
    {
      this._tag = tag;
      this._name = name;
      this._townHallLevel = townHallLevel;
      this._heroes = heroes;
      this._clan = clan;
    }
  }

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

  public get heroes(): ClashHero[] {
    return this._heroes;
  }

  public get clan(): ClashClan {
    return this._clan;
  }
}
