import { Component, Input, Renderer2 } from '@angular/core';

import { BaseComponent } from '../BaseComponent';

import { Font } from '../../../../../../core/api/models/Font';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrl: './average.component.scss',
})
export class AverageComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _time: string;

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public font?: Font;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);

    // Random number between 200 and 259
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

    if (this.font) {
      this._renderer.setStyle(
        this._element,
        'font-family',
        this.font.familyName
      );
    }
  }

  public override onSizeChanged(): void {
    // Change font size of the stars and the color
    if (this._element) {
      this._renderer.setStyle(
        this._element,
        'font-size',
        `${this._sizePixel}px`
      );

      this._updateTransform();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get time(): string {
    return this._time;
  }
}
