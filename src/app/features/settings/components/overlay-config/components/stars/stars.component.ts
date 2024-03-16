import { Component, Input, Renderer2 } from '@angular/core';

import { BaseComponent } from '../BaseComponent';

import { Font } from '../../../../../../core/api/models/Font';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
})
export class StarsComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _stars: number;

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public font?: Font;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);

    // Random number between 10 and 15
    this._stars = Math.floor(Math.random() * 6) + 10;
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

  public get stars(): number {
    return this._stars;
  }
}
