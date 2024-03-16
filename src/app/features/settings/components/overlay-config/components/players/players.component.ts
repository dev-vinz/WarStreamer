import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { BaseComponent } from '../BaseComponent';

import { Font } from '../../../../../../core/api/models/Font';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _defaultHeight = 200;
  private readonly _defaultSize = 15;
  private readonly _defaultStarWidth = 16;
  private readonly _defaultWidth = 300;
  private readonly _worldChampionsNames = [
    ['Juan', 'Wei', 'Terry', 'Youzi Pi', 'Lp'],
    ['Ast', 'BuMm', 'Jojo23', 'Lenaide', 'Vale'],
    ['Jone', 'Mok', 'Qiang Ren', 'Chixin', 'Vic'],
    ['Yuta14', 'Klaus', 'GAKU', 'Kazuma', 'STARs'],
    ['Celinho', 'Leo', 'LoOP', 'Patolino', 'pCastro'],
  ];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _worldChampions: {
    name: string;
    stars: number;
    percent: number;
    time: string;
  }[];

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public font?: Font;

  @ViewChildren('icon')
  private _icons?: QueryList<any>;

  @ViewChildren('star')
  private _stars?: QueryList<ElementRef<HTMLImageElement>>;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);

    const rnd = new Date().getMinutes() % this._worldChampionsNames.length;
    this._worldChampions = [];

    this._worldChampionsNames[rnd].forEach((name) => {
      const time = Math.floor(Math.random() * 60) + 200;

      this._worldChampions.push({
        name,
        stars: Math.floor(Math.random() * 2) + 2,
        percent: Math.floor(Math.random() * 50) + 50,
        time: `${(time / 100).toFixed(2).replace('.', ':')}`,
      });
    });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public emptyStars(nbStars: number): unknown[] {
    return [].constructor(3 - nbStars);
  }

  public fullStars(nbStars: number): unknown[] {
    return [].constructor(nbStars);
  }

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

      // Change width and height of the icons
      this._icons?.forEach((icon) => {
        const element = icon._elem.nativeElement as HTMLElement;
        const svg = element.querySelector('svg');

        this._renderer.setStyle(svg, 'width', `${this._fontSize}px`);
        this._renderer.setStyle(svg, 'height', `${this._fontSize}px`);
      });

      // Change width and height of the stars
      this._stars?.forEach((star) => {
        const element = star.nativeElement;

        this._renderer.setStyle(element, 'width', `${this._starWidth}px`);
        this._renderer.setStyle(element, 'height', `${this._starWidth}px`);
      });

      this._updateTransform();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get worldChampions(): {
    name: string;
    stars: number;
    percent: number;
    time: string;
  }[] {
    return this._worldChampions;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _fontSize(): number {
    return this._defaultSize * this._sizePercentage;
  }

  private get _height(): number {
    return this._defaultHeight * this._sizePercentage;
  }

  private get _starWidth(): number {
    return this._defaultStarWidth * this._sizePercentage;
  }

  private get _width(): number {
    return this._defaultWidth * this._sizePercentage;
  }
}
