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
  selector: 'app-last-attack',
  templateUrl: './last-attack.component.html',
  styleUrl: './last-attack.component.scss',
})
export class LastAttackComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _nbStars: number;
  private _percentage: number;
  private _time: string;

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

    // Stars between 0 and 2
    this._nbStars = Math.floor(Math.random() * 3);

    // Percentage between 40.0 and 80.0
    const percent = Math.floor(Math.random() * 400) + 400;
    this._percentage = percent / 10;

    // Time between 2:00 and 2:59
    const rnd = Math.floor(Math.random() * 60) + 200;
    const time = (rnd / 100).toFixed(2);
    this._time = time.replace('.', ':');
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * *\
  |*             OVERRIDE            *|
  \* * * * * * * * * * * * * * * * * */

  public override lateAfterView(): void {
    this._renderer.setStyle(this._element, 'color', this.color);
    this._renderer.setStyle(
      this._element?.firstChild,
      'border-color',
      `rgba(${this._hexToRGB(this.color)}, 0.3)`
    );

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
      // Change font size of the last attack text and the color
      this._renderer.setStyle(
        this._element,
        'font-size',
        `${this._sizePixel}px`
      );

      // Change width and height of the icons
      this._icons?.forEach((icon) => {
        const element = icon._elem.nativeElement as HTMLElement;
        const svg = element.querySelector('svg');

        this._renderer.setStyle(svg, 'width', `${this._sizePixel}px`);
        this._renderer.setStyle(svg, 'height', `${this._sizePixel}px`);
      });

      // Change width and height of the stars
      this._stars?.forEach((star) => {
        this._renderer.setStyle(
          star.nativeElement,
          'width',
          `${this._sizePixel}px`
        );
        this._renderer.setStyle(
          star.nativeElement,
          'height',
          `${this._sizePixel}px`
        );
      });

      this._updateTransform();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get emptyStars(): unknown[] {
    return [].constructor(3 - this._nbStars);
  }

  public get fullStars(): unknown[] {
    return [].constructor(this._nbStars);
  }

  public get percentage(): number {
    return this._percentage;
  }

  public get time(): string {
    return this._time;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _hexToRGB(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
  }
}
