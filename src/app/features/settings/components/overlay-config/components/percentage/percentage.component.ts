import { Component, Input, Renderer2 } from '@angular/core';

import { BaseComponent } from '../BaseComponent';

import { Font } from '../../../../../../core/api/models/Font';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrl: './percentage.component.scss',
})
export class PercentageComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _percentage: string;

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public font?: Font;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);

    // Random number between 700 and 1000
    const rnd = Math.floor(Math.random() * 300) + 700;
    const percent = (rnd / 10).toFixed(1);
    this._percentage = `${percent}%`;
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

  public get percentage(): string {
    return this._percentage;
  }
}
