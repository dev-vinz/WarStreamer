import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { BaseComponent } from '../BaseComponent';

import { Font } from '../../../../../../core/api/models/Font';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.scss',
})
export class EquipmentsComponent extends BaseComponent implements OnDestroy {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _defaultEquipmentWidth = 25;
  private readonly _defaultHeight = 200;
  private readonly _defaultInterval = 15000;
  private readonly _defaultSize = 15;
  private readonly _defaultWidth = 300;
  private readonly _worldChampionsNames = [
    ['Juan', 'Wei', 'Terry', 'Youzi Pi', 'Lp'],
    ['Ast', 'BuMm', 'Jojo23', 'Lenaide', 'Vale'],
    ['Jone', 'Mok', 'Qiang Ren', 'Chixin', 'Vic'],
    ['Yuta14', 'Klaus', 'GAKU', 'Kazuma', 'STARs'],
    ['Celinho', 'Leo', 'LoOP', 'Patolino', 'pCastro'],
  ];

  private readonly _akEquipments = [
    'Archer Puppet',
    'Frozen Arrow',
    'Giant Arrow',
    'Healer Puppet',
    'Invisibility Vial',
  ];

  private readonly _bkEquipments = [
    'Barbarian Puppet',
    'Earthquake Boots',
    'Giant Gauntlet',
    'Rage Vial',
    'Vampstache',
  ];

  private readonly _gwEquipments = [
    'Eternal Tome',
    'Fireball',
    'Healing Tome',
    'Life Gem',
    'Rage Gem',
  ];

  private readonly _rcEquipments = [
    'Haste Vial',
    'Hog Rider Doll',
    'Royal Gem',
    'Seeking Shield',
  ];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _isArcherBarbarian: boolean = true;
  private _interval: NodeJS.Timeout;
  private _worldChampions: {
    name: string;
    bk: string[];
    aq: string[];
    gw: string[];
    rc: string[];
  }[];

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public font?: Font;

  @ViewChildren('equipment')
  private _equipments?: QueryList<ElementRef<HTMLDivElement>>;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);

    const rnd = new Date().getMinutes() % this._worldChampionsNames.length;
    this._worldChampions = [];

    this._worldChampionsNames[rnd].forEach((name) => {
      // Take two random from each list
      const aq = this._akEquipments.sort(() => 0.5 - Math.random()).slice(0, 2);
      const bk = this._bkEquipments.sort(() => 0.5 - Math.random()).slice(0, 2);
      const gw = this._gwEquipments.sort(() => 0.5 - Math.random()).slice(0, 2);
      const rc = this._rcEquipments.sort(() => 0.5 - Math.random()).slice(0, 2);

      // Transform into assets
      const aqImg: string[] = aq.map(
        (name) =>
          `assets/images/settings/equipments/archer-queen/${name
            .toLowerCase()
            .replace(/ /g, '_')}.png`
      );

      const bkImg: string[] = bk.map(
        (name) =>
          `assets/images/settings/equipments/barbarian-king/${name
            .toLowerCase()
            .replace(/ /g, '_')}.png`
      );

      const gwImg: string[] = gw.map(
        (name) =>
          `assets/images/settings/equipments/grand-warden/${name
            .toLowerCase()
            .replace(/ /g, '_')}.png`
      );

      const rcImg: string[] = rc.map(
        (name) =>
          `assets/images/settings/equipments/royal-champion/${name
            .toLowerCase()
            .replace(/ /g, '_')}.png`
      );

      this._worldChampions.push({
        name,
        aq: aqImg,
        bk: bkImg,
        gw: gwImg,
        rc: rcImg,
      });
    });

    // Start the animation
    this._interval = this._startAnimation();
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * *\
  |*             OVERRIDE            *|
  \* * * * * * * * * * * * * * * * * */

  public override lateAfterView(): void {
    this._renderer.setStyle(this._element, 'color', this.color);

    if (this.font) {
      this._renderer.setStyle(
        this._element,
        'font-family',
        this.font.familyName
      );
    }
  }

  public override onSizeChanged(): void {
    if (this._element) {
      // Change font size of the stars and the color
      this._renderer.setStyle(
        this._element,
        'font-size',
        `${this._fontSize}px`
      );

      // Change width and height of the container
      this._renderer.setStyle(this._element, 'width', `${this._width}px`);
      this._renderer.setStyle(this._element, 'height', `${this._height}px`);

      // Change width and height of the equipments
      this._updateEquipmentsSize();

      this._updateTransform();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get isArcherBarbarian(): boolean {
    return this._isArcherBarbarian;
  }

  public get worldChampions(): {
    name: string;
    bk: string[];
    aq: string[];
    gw: string[];
    rc: string[];
  }[] {
    return this._worldChampions;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _startAnimation(): NodeJS.Timeout {
    return setInterval(() => {
      this._isArcherBarbarian = !this._isArcherBarbarian;
      setTimeout(() => {
        this._updateEquipmentsSize();
      });
    }, this._defaultInterval);
  }

  private _updateEquipmentsSize(): void {
    this._equipments?.forEach((equipment) => {
      const element = equipment.nativeElement;

      this._renderer.setStyle(element, 'width', `${this._equipmentWidth}px`);
      this._renderer.setStyle(element, 'height', `${this._equipmentWidth}px`);
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _equipmentWidth(): number {
    return this._defaultEquipmentWidth * this._sizePercentage;
  }

  private get _height(): number {
    return this._defaultHeight * this._sizePercentage;
  }

  private get _fontSize(): number {
    return this._defaultSize * this._sizePercentage;
  }

  private get _width(): number {
    return this._defaultWidth * this._sizePercentage;
  }
}
