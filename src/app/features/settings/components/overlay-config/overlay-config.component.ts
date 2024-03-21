import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';

import { Font } from '../../../../core/api/models/Font';
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
  selector: 'app-overlay-config',
  templateUrl: './overlay-config.component.html',
  styleUrl: './overlay-config.component.scss',
})
export class OverlayConfigComponent
  implements AfterViewInit, OnChanges, OnDestroy, OnInit
{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _defaultInterval = 30000;

  private readonly _textColorWhite = [230, 230, 230];
  private readonly _textColorBlack = [33, 33, 33];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _detailsVisible: boolean = true;
  private _equipmentsVisible: boolean = true;
  private _fonts: Font[] = [];
  private _playerInterval?: NodeJS.Timeout;

  private _defaultWidth: number = OverlaySetting.DEFAULT_WIDTH;
  private _defaultHeight: number = OverlaySetting.DEFAULT_HEIGHT;

  @Input()
  public averageDurationDraggable: boolean = false;

  @Input()
  public clanNameDraggable: boolean = false;

  @Input()
  public heroesEquipmentsDraggable: boolean = false;

  @Input()
  public images: FullImage[] = [];

  @Input()
  public imageDraggable: boolean = false;

  @Input()
  public lastAttackToWinDraggable: boolean = false;

  @Input()
  public logoDraggable: boolean = false;

  @Input()
  public overlaySetting: OverlaySetting | undefined;

  @Input()
  public playerDetailsDraggable: boolean = false;

  @Input()
  public playerModeEnabled: 'both' | 'details' | 'equipments' = 'both';

  @Input()
  public totalPercentageDraggable: boolean = false;

  @Input()
  public totalStarsDraggable: boolean = false;

  @Output()
  public settingModified: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('overlayConfig')
  private _overlayElement?: ElementRef<HTMLDivElement>;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  ngAfterViewInit(): void {
    if (!this._overlayElement) {
      throw new Error('Overlay element not found');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const playerModeChange = changes['playerModeEnabled'];

    if (!playerModeChange || playerModeChange.firstChange) {
      return;
    }

    this._onPlayerModeChange();
  }

  ngOnDestroy(): void {
    if (this._playerInterval) {
      clearInterval(this._playerInterval);
    }
  }

  async ngOnInit(): Promise<void> {
    // Set container size
    if (this.overlaySetting) {
      this._defaultWidth = Math.floor(this.overlaySetting.width / 2);
      this._defaultHeight = this.overlaySetting.height;
    }

    this._onPlayerModeChange();
    this._fonts = await this._apiService.fonts.getAll().execute();
    this._fonts.forEach((font) => this._createFontFaceRule(font));
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onModified(event: boolean): void {
    this.settingModified.emit(event);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundColor(): string {
    return this.overlaySetting?.backgroundColor ?? 'transparent';
  }

  public get borderColor(): string {
    const color = this._getContrastColor(this._hexToRgb(this.backgroundColor));
    return `rgba(${color.join(', ')}, 0.8)`;
  }

  public get containerHeight(): number {
    return this._containerRatio * this._height;
  }

  public get containerWidth(): number {
    return Math.min(this._elementWidth, this._width);
  }

  public get detailsVisible(): boolean {
    return this._detailsVisible;
  }

  public get equipmentsVisible(): boolean {
    return this._equipmentsVisible;
  }

  public get font(): Font | undefined {
    return this._fonts.find((font) => font.id === this.overlaySetting?.fontId);
  }

  public get textColor(): string {
    return this.overlaySetting?.textColor ?? '#FFFFFF';
  }

  public get widthRatio(): number {
    return this._containerRatio;
  }

  /* * * * * * * * * * *\
  |*  AVERAGE DURATION *|
  \* * * * * * * * * * */

  public get averageDurationLocation(): Location2D {
    return this.overlaySetting?.averageDurationLocation ?? new Location2D(0, 0);
  }

  public get isAverageDuration(): boolean {
    return (
      this.overlaySetting !== undefined &&
      this.overlaySetting.averageDurationVisible
    );
  }

  /* * * * * * * * * * *\
  |*     CLAN NAME     *|
  \* * * * * * * * * * */

  public get clanNameLocation(): Location2D {
    return this.overlaySetting?.clanNameLocation ?? new Location2D(0, 0);
  }

  public get isClanName(): boolean {
    return (
      this.overlaySetting !== undefined && this.overlaySetting.clanNameVisible
    );
  }

  /* * * * * * * * * * *\
  |* HEROES EQUIPMENTS *|
  \* * * * * * * * * * */

  public get heroesEquipmentsLocation(): Location2D {
    return (
      this.overlaySetting?.heroesEquipmentsLocation ?? new Location2D(0, 0)
    );
  }

  public get isHeroesEquipments(): boolean {
    return (
      this.overlaySetting !== undefined &&
      this.overlaySetting.heroesEquipmentsVisible
    );
  }

  /* * * * * * * * * * *\
  |*    LAST ATTACK    *|
  \* * * * * * * * * * */

  public get isLastAttackToWin(): boolean {
    return (
      this.overlaySetting !== undefined &&
      this.overlaySetting.lastAttackToWinVisible
    );
  }

  public get lastAttackToWinLocation(): Location2D {
    return this.overlaySetting?.lastAttackToWinLocation ?? new Location2D(0, 0);
  }

  /* * * * * * * * * * *\
  |*        LOGO       *|
  \* * * * * * * * * * */

  public get isLogo(): boolean {
    return this.overlaySetting !== undefined && this.overlaySetting.logoVisible;
  }

  public get logoLocation(): Location2D {
    return this.overlaySetting?.logoLocation ?? new Location2D(0, 0);
  }

  /* * * * * * * * * * *\
  |*   PLAYER DETAILS  *|
  \* * * * * * * * * * */

  public get isPlayerDetails(): boolean {
    return (
      this.overlaySetting !== undefined &&
      this.overlaySetting.playerDetailsVisible
    );
  }

  public get playerDetailsLocation(): Location2D {
    return this.overlaySetting?.playerDetailsLocation ?? new Location2D(0, 0);
  }

  /* * * * * * * * * * *\
  |*  TOTAL PERCENTAGE *|
  \* * * * * * * * * * */

  public get isTotalPercentage(): boolean {
    return (
      this.overlaySetting !== undefined &&
      this.overlaySetting.totalPercentageVisible
    );
  }

  public get totalPercentageLocation(): Location2D {
    return this.overlaySetting?.totalPercentageLocation ?? new Location2D(0, 0);
  }

  /* * * * * * * * * * *\
  |*    TOTAL STARS    *|
  \* * * * * * * * * * */

  public get isTotalStars(): boolean {
    return (
      this.overlaySetting !== undefined && this.overlaySetting.totalStarsVisible
    );
  }

  public get totalStarsLocation(): Location2D {
    return this.overlaySetting?.totalStarsLocation ?? new Location2D(0, 0);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private async _createFontFaceRule(font: Font): Promise<void> {
    const fontFace = document.createElement('style');
    fontFace.textContent = `@font-face {
      font-family: '${font.familyName}';
      src: url(${await font.generateFontSource()}) format('woff');
    }`;

    document.head.appendChild(fontFace);
  }

  private _getContrastColor(rgbColor: number[]): number[] {
    const [r, g, b] = rgbColor;

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? this._textColorBlack : this._textColorWhite;
  }

  private _hexToRgb(hex: string): number[] {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    return [r, g, b];
  }

  private _onPlayerModeChange(): void {
    this._setPlayerMode();

    // Reset the interval
    if (this._playerInterval) {
      clearInterval(this._playerInterval);
    }

    // Set the player mode flags
    this._detailsVisible = this.playerModeEnabled === 'details';
    this._equipmentsVisible = this.playerModeEnabled === 'equipments';

    // If the player mode is set to both, we start the interval
    // but first we need to enable the player details
    if (this.playerModeEnabled === 'both') {
      this._detailsVisible = true;
      this._playerInterval = this._startInterval();
    }
  }

  private _setPlayerMode(): void {
    if (
      this.overlaySetting?.playerDetailsVisible &&
      this.overlaySetting?.heroesEquipmentsVisible
    ) {
      this.playerModeEnabled = 'both';
    } else if (this.overlaySetting?.playerDetailsVisible) {
      this.playerModeEnabled = 'details';
    } else if (this.overlaySetting?.heroesEquipmentsVisible) {
      this.playerModeEnabled = 'equipments';
    }
  }

  private _startInterval(): NodeJS.Timeout {
    return setInterval(() => {
      switch (this.playerModeEnabled) {
        case 'both':
          this._detailsVisible = !this._detailsVisible;
          this._equipmentsVisible = !this._equipmentsVisible;
          break;
      }
    }, this._defaultInterval);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _containerRatio(): number {
    return this.containerWidth / this._width;
  }

  private get _elementWidth(): number {
    return this._overlayElement?.nativeElement.clientWidth || this._width;
  }

  private get _height(): number {
    return this.overlaySetting?.height ?? this._defaultHeight;
  }

  private get _width(): number {
    return Math.floor((this.overlaySetting?.width ?? this._defaultWidth) / 2);
  }
}
