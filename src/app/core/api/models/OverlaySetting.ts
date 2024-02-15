import { Expose } from 'class-transformer';

import { Location2D } from './Location2D';

export class OverlaySetting {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Expose({ name: 'userId' })
  private _userId: string;

  @Expose({ name: 'fontId' })
  private _fontId?: string;

  @Expose({ name: 'textColor' })
  private _textColor: string;

  @Expose({ name: 'logoVisible' })
  private _logoVisible: boolean;

  @Expose({ name: 'logoSize' })
  private _logoSize?: number;

  @Expose({ name: 'logoLocation' })
  private _logoLocation?: Location2D;

  @Expose({ name: 'clanNameVisible' })
  private _clanNameVisible: boolean;

  @Expose({ name: 'clanNameSize' })
  private _clanNameSize?: number;

  @Expose({ name: 'clanNameLocation' })
  private _clanNameLocation?: Location2D;

  @Expose({ name: 'totalStarsVisible' })
  private _totalStarsVisible: boolean;

  @Expose({ name: 'totalStarsSize' })
  private _totalStarsSize?: number;

  @Expose({ name: 'totalStarsLocation' })
  private _totalStarsLocation?: Location2D;

  @Expose({ name: 'totalPercentageVisible' })
  private _totalPercentageVisible: boolean;

  @Expose({ name: 'totalPercentageSize' })
  private _totalPercentageSize?: number;

  @Expose({ name: 'totalPercentageLocation' })
  private _totalPercentageLocation?: Location2D;

  @Expose({ name: 'averageDurationVisible' })
  private _averageDurationVisible: boolean;

  @Expose({ name: 'averageDurationSize' })
  private _averageDurationSize?: number;

  @Expose({ name: 'averageDurationLocation' })
  private _averageDurationLocation?: Location2D;

  @Expose({ name: 'playerDetailsVisible' })
  private _playerDetailsVisible: boolean;

  @Expose({ name: 'playerDetailsSize' })
  private _playerDetailsSize?: number;

  @Expose({ name: 'playerDetailsLocation' })
  private _playerDetailsLocation?: Location2D;

  @Expose({ name: 'lastAttackToWinVisible' })
  private _lastAttackToWinVisible: boolean;

  @Expose({ name: 'lastAttackToWinSize' })
  private _lastAttackToWinSize?: number;

  @Expose({ name: 'lastAttackToWinLocation' })
  private _lastAttackToWinLocation?: Location2D;

  @Expose({ name: 'heroesEquipmentsVisible' })
  private _heroesEquipmentsVisible: boolean;

  @Expose({ name: 'heroesEquipmentsSize' })
  private _heroesEquipmentsSize?: number;

  @Expose({ name: 'heroesEquipmentsLocation' })
  private _heroesEquipmentsLocation?: Location2D;

  @Expose({ name: 'mirrorReflection' })
  private _mirrorReflection: boolean;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    userId: string,
    fontId: string,
    textColor: string,
    logoVisible: boolean,
    logoSize: number,
    logoLocation: Location2D,
    clanNameVisible: boolean,
    clanNameSize: number,
    clanNameLocation: Location2D,
    totalStarsVisible: boolean,
    totalStarsSize: number,
    totalStarsLocation: Location2D,
    totalPercentageVisible: boolean,
    totalPercentageSize: number,
    totalPercentageLocation: Location2D,
    averageDurationVisible: boolean,
    averageDurationSize: number,
    averageDurationLocation: Location2D,
    playerDetailsVisible: boolean,
    playerDetailsSize: number,
    playerDetailsLocation: Location2D,
    lastAttackToWinVisible: boolean,
    lastAttackToWinSize: number,
    lastAttackToWinLocation: Location2D,
    heroesEquipmentsVisible: boolean,
    heroesEquipmentsSize: number,
    heroesEquipmentsLocation: Location2D,
    mirrorReflection: boolean
  ) {
    // Inputs
    {
      this._userId = userId;
      this._fontId = fontId;
      this._textColor = textColor;
      this._logoVisible = logoVisible;
      this._logoSize = logoSize;
      this._logoLocation = logoLocation;
      this._clanNameVisible = clanNameVisible;
      this._clanNameSize = clanNameSize;
      this._clanNameLocation = clanNameLocation;
      this._totalStarsVisible = totalStarsVisible;
      this._totalStarsSize = totalStarsSize;
      this._totalStarsLocation = totalStarsLocation;
      this._totalPercentageVisible = totalPercentageVisible;
      this._totalPercentageSize = totalPercentageSize;
      this._totalPercentageLocation = totalPercentageLocation;
      this._averageDurationVisible = averageDurationVisible;
      this._averageDurationSize = averageDurationSize;
      this._averageDurationLocation = averageDurationLocation;
      this._playerDetailsVisible = playerDetailsVisible;
      this._playerDetailsSize = playerDetailsSize;
      this._playerDetailsLocation = playerDetailsLocation;
      this._lastAttackToWinVisible = lastAttackToWinVisible;
      this._lastAttackToWinSize = lastAttackToWinSize;
      this._lastAttackToWinLocation = lastAttackToWinLocation;
      this._heroesEquipmentsVisible = heroesEquipmentsVisible;
      this._heroesEquipmentsSize = heroesEquipmentsSize;
      this._heroesEquipmentsLocation = heroesEquipmentsLocation;
      this._mirrorReflection = mirrorReflection;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get userId(): string {
    return this._userId;
  }

  public get fontId(): string | undefined {
    return this._fontId;
  }

  public get textColor(): string {
    return this._textColor;
  }

  public get logoVisible(): boolean {
    return this._logoVisible;
  }

  public get logoSize(): number | undefined {
    return this._logoSize;
  }

  public get logoLocation(): Location2D | undefined {
    return this._logoLocation;
  }

  public get clanNameVisible(): boolean {
    return this._clanNameVisible;
  }

  public get clanNameSize(): number | undefined {
    return this._clanNameSize;
  }

  public get clanNameLocation(): Location2D | undefined {
    return this._clanNameLocation;
  }

  public get totalStarsVisible(): boolean {
    return this._totalStarsVisible;
  }

  public get totalStarsSize(): number | undefined {
    return this._totalStarsSize;
  }

  public get totalStarsLocation(): Location2D | undefined {
    return this._totalStarsLocation;
  }

  public get totalPercentageVisible(): boolean {
    return this._totalPercentageVisible;
  }

  public get totalPercentageSize(): number | undefined {
    return this._totalPercentageSize;
  }

  public get totalPercentageLocation(): Location2D | undefined {
    return this._totalPercentageLocation;
  }

  public get averageDurationVisible(): boolean {
    return this._averageDurationVisible;
  }

  public get averageDurationSize(): number | undefined {
    return this._averageDurationSize;
  }

  public get averageDurationLocation(): Location2D | undefined {
    return this._averageDurationLocation;
  }

  public get playerDetailsVisible(): boolean {
    return this._playerDetailsVisible;
  }

  public get playerDetailsSize(): number | undefined {
    return this._playerDetailsSize;
  }

  public get playerDetailsLocation(): Location2D | undefined {
    return this._playerDetailsLocation;
  }

  public get lastAttackToWinVisible(): boolean {
    return this._lastAttackToWinVisible;
  }

  public get lastAttackToWinSize(): number | undefined {
    return this._lastAttackToWinSize;
  }

  public get lastAttackToWinLocation(): Location2D | undefined {
    return this._lastAttackToWinLocation;
  }

  public get heroesEquipmentsVisible(): boolean {
    return this._heroesEquipmentsVisible;
  }

  public get heroesEquipmentsSize(): number | undefined {
    return this._heroesEquipmentsSize;
  }

  public get heroesEquipmentsLocation(): Location2D | undefined {
    return this._heroesEquipmentsLocation;
  }

  public get mirrorReflection(): boolean {
    return this._mirrorReflection;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set fontId(value: string | undefined) {
    this._fontId = value;
  }

  public set textColor(value: string) {
    this._textColor = value;
  }

  public set logoVisible(value: boolean) {
    this._logoVisible = value;
  }

  public set logoSize(value: number | undefined) {
    this._logoSize = value;
  }

  public set logoLocation(value: Location2D | undefined) {
    this._logoLocation = value;
  }

  public set clanNameVisible(value: boolean) {
    this._clanNameVisible = value;
  }

  public set clanNameSize(value: number | undefined) {
    this._clanNameSize = value;
  }

  public set clanNameLocation(value: Location2D | undefined) {
    this._clanNameLocation = value;
  }

  public set totalStarsVisible(value: boolean) {
    this._totalStarsVisible = value;
  }

  public set totalStarsSize(value: number | undefined) {
    this._totalStarsSize = value;
  }

  public set totalStarsLocation(value: Location2D | undefined) {
    this._totalStarsLocation = value;
  }

  public set totalPercentageVisible(value: boolean) {
    this._totalPercentageVisible = value;
  }

  public set totalPercentageSize(value: number | undefined) {
    this._totalPercentageSize = value;
  }

  public set totalPercentageLocation(value: Location2D | undefined) {
    this._totalPercentageLocation = value;
  }

  public set averageDurationVisible(value: boolean) {
    this._averageDurationVisible = value;
  }

  public set averageDurationSize(value: number | undefined) {
    this._averageDurationSize = value;
  }

  public set averageDurationLocation(value: Location2D | undefined) {
    this._averageDurationLocation = value;
  }

  public set playerDetailsVisible(value: boolean) {
    this._playerDetailsVisible = value;
  }

  public set playerDetailsSize(value: number | undefined) {
    this._playerDetailsSize = value;
  }

  public set playerDetailsLocation(value: Location2D | undefined) {
    this._playerDetailsLocation = value;
  }

  public set lastAttackToWinVisible(value: boolean) {
    this._lastAttackToWinVisible = value;
  }

  public set lastAttackToWinSize(value: number | undefined) {
    this._lastAttackToWinSize = value;
  }

  public set lastAttackToWinLocation(value: Location2D | undefined) {
    this._lastAttackToWinLocation = value;
  }

  public set heroesEquipmentsVisible(value: boolean) {
    this._heroesEquipmentsVisible = value;
  }

  public set heroesEquipmentsSize(value: number | undefined) {
    this._heroesEquipmentsSize = value;
  }

  public set heroesEquipmentsLocation(value: Location2D | undefined) {
    this._heroesEquipmentsLocation = value;
  }

  public set mirrorReflection(value: boolean) {
    this._mirrorReflection = value;
  }
}
