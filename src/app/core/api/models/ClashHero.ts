import { ClashHeroEquipment } from './ClashHeroEquipment';

export class ClashHero {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _name: string;
  private _level: number;
  private _equipments: ClashHeroEquipment[];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(name: string, level: number, equipments: ClashHeroEquipment[]) {
    // Inputs
    {
      this._name = name;
      this._level = level;
      this._equipments = equipments;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get name(): string {
    return this._name;
  }

  public get level(): number {
    return this._level;
  }

  public get equipments(): ClashHeroEquipment[] {
    return this._equipments;
  }
}
