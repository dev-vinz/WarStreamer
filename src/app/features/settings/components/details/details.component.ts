import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Image } from '../../../../core/api/models/Image';
import { Location2D } from '../../../../core/api/models/Location2D';
import { OverlaySetting } from '../../../../core/api/models/OverlaySetting';

type FullImage = {
  element: Image;
  url: string;
  keepRatio: boolean;
  ratio: number;
};

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _defaultHeroesEquipmentsLocation = new Location2D(0, 0);
  private readonly _defaultHeroesEquipmentsSize = 100;
  private readonly _defaultLastAttackToWinLocation = new Location2D(0, 0);
  private readonly _defaultLastAttackToWinSize = 14;
  private readonly _defaultPlayerDetailsLocation = new Location2D(0, 0);
  private readonly _defaultPlayerDetailsSize = 100;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public images: FullImage[] = [];

  @Input()
  public overlaySetting: OverlaySetting | undefined;

  @Output()
  public modifiedChange: EventEmitter<boolean> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get heroesEquipmentsActive(): boolean {
    return this.heroesEquipmentsVisible && !this.playerDetailsVisible;
  }

  public get heroesEquipmentsLocationX(): number {
    return (
      this.overlaySetting?.heroesEquipmentsLocation?.x ??
      this._defaultHeroesEquipmentsLocation.x
    );
  }

  public get heroesEquipmentsLocationY(): number {
    return (
      this.overlaySetting?.heroesEquipmentsLocation?.y ??
      this._defaultHeroesEquipmentsLocation.y
    );
  }

  public get heroesEquipmentsSize(): number {
    return (
      this.overlaySetting?.heroesEquipmentsSize ??
      this._defaultHeroesEquipmentsSize
    );
  }

  public get heroesEquipmentsVisible(): boolean {
    return this.overlaySetting?.heroesEquipmentsVisible ?? false;
  }

  public get lastAttackToWinLocationX(): number {
    return (
      this.overlaySetting?.lastAttackToWinLocation?.x ??
      this._defaultLastAttackToWinLocation.x
    );
  }

  public get lastAttackToWinLocationY(): number {
    return (
      this.overlaySetting?.lastAttackToWinLocation?.y ??
      this._defaultLastAttackToWinLocation.y
    );
  }

  public get lastAttackToWinSize(): number {
    return (
      this.overlaySetting?.lastAttackToWinSize ??
      this._defaultLastAttackToWinSize
    );
  }

  public get lastAttackToWinVisible(): boolean {
    return this.overlaySetting?.lastAttackToWinVisible ?? false;
  }

  public get playerDetailsLocationX(): number {
    const locationX =
      this.overlaySetting?.playerDetailsLocation?.x ??
      this._defaultPlayerDetailsLocation.x;

    // If the heroes equipments are active, bind the location to equipments
    if (this.playerDetailsVisible && this.heroesEquipmentsVisible) {
      this._updateEquipmentsLocationX(locationX, false);
    }

    return locationX;
  }

  public get playerDetailsLocationY(): number {
    const locationY =
      this.overlaySetting?.playerDetailsLocation?.y ??
      this._defaultPlayerDetailsLocation.y;

    // If the heroes equipments are active, bind the location to equipments
    if (this.playerDetailsVisible && this.heroesEquipmentsVisible) {
      this._updateEquipmentsLocationY(locationY, false);
    }

    return locationY;
  }

  public get playerDetailsSize(): number {
    const size =
      this.overlaySetting?.playerDetailsSize ?? this._defaultPlayerDetailsSize;

    // If the heroes equipments are active, bind the size to equipments
    if (this.playerDetailsVisible && this.heroesEquipmentsVisible) {
      this._updateEquipmentsSize(size, false);
    }

    return size;
  }

  public get playerDetailsVisible(): boolean {
    return this.overlaySetting?.playerDetailsVisible ?? false;
  }

  public get playerMode(): 'both' | 'details' | 'equipments' {
    if (this.heroesEquipmentsVisible && this.playerDetailsVisible) {
      return 'both';
    } else if (this.heroesEquipmentsVisible) {
      return 'equipments';
    } else {
      return 'details';
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set heroesEquipmentsLocationX(value: number) {
    this._updateEquipmentsLocationX(value, true);
  }

  public set heroesEquipmentsLocationY(value: number) {
    this._updateEquipmentsLocationY(value, true);
  }

  public set heroesEquipmentsSize(value: number) {
    this._updateEquipmentsSize(value, true);
  }

  public set heroesEquipmentsVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.heroesEquipmentsVisible = value;
      this.overlaySetting.heroesEquipmentsLocation =
        this._defaultHeroesEquipmentsLocation;
      this.overlaySetting.heroesEquipmentsSize =
        this._defaultHeroesEquipmentsSize;

      this.modified = true;
    }
  }

  public set lastAttackToWinLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.lastAttackToWinLocation === undefined) {
        this.overlaySetting.lastAttackToWinLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.lastAttackToWinLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set lastAttackToWinLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.lastAttackToWinLocation === undefined) {
        this.overlaySetting.lastAttackToWinLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.lastAttackToWinLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set lastAttackToWinSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.lastAttackToWinSize = value;
      this.modified = true;
    }
  }

  public set lastAttackToWinVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.lastAttackToWinVisible = value;
      this.overlaySetting.lastAttackToWinLocation =
        this._defaultLastAttackToWinLocation;
      this.overlaySetting.lastAttackToWinSize =
        this._defaultLastAttackToWinSize;

      this.modified = true;
    }
  }

  @Input()
  public set modified(value: boolean) {
    this.modifiedChange.emit(value);
  }

  public set playerDetailsLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.playerDetailsLocation === undefined) {
        this.overlaySetting.playerDetailsLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.playerDetailsLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set playerDetailsLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.playerDetailsLocation === undefined) {
        this.overlaySetting.playerDetailsLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.playerDetailsLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set playerDetailsSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.playerDetailsSize = value;
      this.modified = true;
    }
  }

  public set playerDetailsVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.playerDetailsVisible = value;
      this.overlaySetting.playerDetailsLocation =
        this._defaultPlayerDetailsLocation;
      this.overlaySetting.playerDetailsSize = this._defaultPlayerDetailsSize;

      // If set to visible and the equipments are active,
      // initialize the location and size to the same as the equipments
      if (value && this.heroesEquipmentsVisible) {
        this.overlaySetting.playerDetailsLocation.x =
          this.heroesEquipmentsLocationX;
        this.overlaySetting.playerDetailsLocation.y =
          this.heroesEquipmentsLocationY;
        this.overlaySetting.playerDetailsSize = this.heroesEquipmentsSize;
      }

      this.modified = true;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _updateEquipmentsLocationX(value: number, modified: boolean): void {
    if (this.overlaySetting) {
      if (this.overlaySetting.heroesEquipmentsLocation === undefined) {
        this.overlaySetting.heroesEquipmentsLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.heroesEquipmentsLocation.x = value;
      }

      if (modified) {
        this.modified = true;
      }
    }
  }

  private _updateEquipmentsLocationY(value: number, modified: boolean): void {
    if (this.overlaySetting) {
      if (this.overlaySetting.heroesEquipmentsLocation === undefined) {
        this.overlaySetting.heroesEquipmentsLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.heroesEquipmentsLocation.y = value;
      }

      if (modified) {
        this.modified = true;
      }
    }
  }

  private _updateEquipmentsSize(value: number, modified: boolean): void {
    if (this.overlaySetting) {
      this.overlaySetting.heroesEquipmentsSize = value;

      if (modified) {
        this.modified = true;
      }
    }
  }
}
