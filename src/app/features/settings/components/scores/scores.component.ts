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
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _defaultAverageDurationLocation = new Location2D(0, 0);
  private readonly _defaultAverageDurationSize = 20;
  private readonly _defaultTotalPercentageLocation = new Location2D(0, 0);
  private readonly _defaultTotalPercentageSize = 30;
  private readonly _defaultTotalStarsLocation = new Location2D(0, 0);
  private readonly _defaultTotalStarsSize = 50;

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

  public get averageDurationLocationX(): number {
    return (
      this.overlaySetting?.averageDurationLocation?.x ??
      this._defaultAverageDurationLocation.x
    );
  }

  public get averageDurationLocationY(): number {
    return (
      this.overlaySetting?.averageDurationLocation?.y ??
      this._defaultAverageDurationLocation.y
    );
  }

  public get averageDurationSize(): number {
    return (
      this.overlaySetting?.averageDurationSize ??
      this._defaultAverageDurationSize
    );
  }

  public get averageDurationVisible(): boolean {
    return this.overlaySetting?.averageDurationVisible ?? false;
  }

  public get totalPercentageLocationX(): number {
    return (
      this.overlaySetting?.totalPercentageLocation?.x ??
      this._defaultTotalPercentageLocation.x
    );
  }

  public get totalPercentageLocationY(): number {
    return (
      this.overlaySetting?.totalPercentageLocation?.y ??
      this._defaultTotalPercentageLocation.y
    );
  }

  public get totalPercentageSize(): number {
    return (
      this.overlaySetting?.totalPercentageSize ??
      this._defaultTotalPercentageSize
    );
  }

  public get totalPercentageVisible(): boolean {
    return this.overlaySetting?.totalPercentageVisible ?? false;
  }

  public get totalStarsLocationX(): number {
    return (
      this.overlaySetting?.totalStarsLocation?.x ??
      this._defaultTotalStarsLocation.x
    );
  }

  public get totalStarsLocationY(): number {
    return (
      this.overlaySetting?.totalStarsLocation?.y ??
      this._defaultTotalStarsLocation.y
    );
  }

  public get totalStarsSize(): number {
    return this.overlaySetting?.totalStarsSize ?? this._defaultTotalStarsSize;
  }

  public get totalStarsVisible(): boolean {
    return this.overlaySetting?.totalStarsVisible ?? false;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set averageDurationLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.averageDurationLocation === undefined) {
        this.overlaySetting.averageDurationLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.averageDurationLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set averageDurationLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.averageDurationLocation === undefined) {
        this.overlaySetting.averageDurationLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.averageDurationLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set averageDurationSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.averageDurationSize = value;
      this.modified = true;
    }
  }

  public set averageDurationVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.averageDurationVisible = value;
      this.overlaySetting.averageDurationLocation =
        this._defaultAverageDurationLocation;
      this.overlaySetting.averageDurationSize =
        this._defaultAverageDurationSize;
      this.modified = true;
    }
  }

  @Input()
  public set modified(value: boolean) {
    this.modifiedChange.emit(value);
  }

  public set totalPercentageLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.totalPercentageLocation === undefined) {
        this.overlaySetting.totalPercentageLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.totalPercentageLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set totalPercentageLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.totalPercentageLocation === undefined) {
        this.overlaySetting.totalPercentageLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.totalPercentageLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set totalPercentageSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.totalPercentageSize = value;
      this.modified = true;
    }
  }

  public set totalPercentageVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.totalPercentageVisible = value;
      this.overlaySetting.totalPercentageLocation =
        this._defaultTotalPercentageLocation;
      this.overlaySetting.totalPercentageSize =
        this._defaultTotalPercentageSize;
      this.modified = true;
    }
  }

  public set totalStarsLocationX(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.totalStarsLocation === undefined) {
        this.overlaySetting.totalStarsLocation = new Location2D(value, 0);
      } else {
        this.overlaySetting.totalStarsLocation.x = value;
      }

      this.modified = true;
    }
  }

  public set totalStarsLocationY(value: number) {
    if (this.overlaySetting) {
      if (this.overlaySetting.totalStarsLocation === undefined) {
        this.overlaySetting.totalStarsLocation = new Location2D(0, value);
      } else {
        this.overlaySetting.totalStarsLocation.y = value;
      }

      this.modified = true;
    }
  }

  public set totalStarsSize(value: number) {
    if (this.overlaySetting) {
      this.overlaySetting.totalStarsSize = value;
      this.modified = true;
    }
  }

  public set totalStarsVisible(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.totalStarsVisible = value;
      this.overlaySetting.totalStarsLocation = this._defaultTotalStarsLocation;
      this.overlaySetting.totalStarsSize = this._defaultTotalStarsSize;

      this.modified = true;
    }
  }
}
