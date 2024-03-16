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
  selector: 'app-clans',
  templateUrl: './clans.component.html',
  styleUrl: './clans.component.scss',
})
export class ClansComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _defaultClanNameLocation = new Location2D(0, 0);
  private readonly _defaultClanNameSize = 20;
  private readonly _defaultLogoLocation = new Location2D(0, 0);
  private readonly _defaultLogoSize = 100;

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

  public get clanNameLocationX(): number {
    return (
      this.overlaySetting?.clanNameLocation?.x ??
      this._defaultClanNameLocation.x
    );
  }

  public get clanNameLocationY(): number {
    return (
      this.overlaySetting?.clanNameLocation?.y ??
      this._defaultClanNameLocation.y
    );
  }

  public get clanNameSize(): number {
    return this.overlaySetting?.clanNameSize ?? this._defaultClanNameSize;
  }

  public get clanNameVisible(): boolean {
    return this.overlaySetting?.clanNameVisible ?? false;
  }

  public get logoLocationX(): number {
    return this.overlaySetting?.logoLocation?.x ?? this._defaultLogoLocation.x;
  }

  public get logoLocationY(): number {
    return this.overlaySetting?.logoLocation?.y ?? this._defaultLogoLocation.y;
  }

  public get logoSize(): number {
    return this.overlaySetting?.logoSize ?? this._defaultLogoSize;
  }

  public get logoVisible(): boolean {
    return this.overlaySetting?.logoVisible ?? false;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set clanNameVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.clanNameVisible = value;
      this.overlaySetting.clanNameLocation = this._defaultClanNameLocation;
      this.overlaySetting.clanNameSize = this._defaultClanNameSize;
      this.modified = true;
    }
  }

  public set clanNameLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.clanNameLocation === undefined) {
        this.overlaySetting.clanNameLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.clanNameLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set clanNameLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.clanNameLocation === undefined) {
        this.overlaySetting.clanNameLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.clanNameLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set clanNameSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.clanNameSize = value;
      this.modified = true;
    }
  }

  public set logoLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.logoLocation === undefined) {
        this.overlaySetting.logoLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.logoLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set logoLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.logoLocation === undefined) {
        this.overlaySetting.logoLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.logoLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set logoSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.logoSize = value;
      this.modified = true;
    }
  }

  public set logoVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.logoVisible = value;
      this.overlaySetting.logoLocation = this._defaultLogoLocation;
      this.overlaySetting.logoSize = this._defaultLogoSize;

      this.modified = true;
    }
  }

  @Input()
  public set modified(value: boolean) {
    this.modifiedChange.emit(value);
  }
}
