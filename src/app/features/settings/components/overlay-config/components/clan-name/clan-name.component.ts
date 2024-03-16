import { Component, Input, Renderer2 } from '@angular/core';

import { BaseComponent } from '../BaseComponent';

import { Font } from '../../../../../../core/api/models/Font';

@Component({
  selector: 'app-clan-name',
  templateUrl: './clan-name.component.html',
  styleUrl: './clan-name.component.scss',
})
export class ClanNameComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _worldChampions: string[] = [
    'NOVA毛豆 ',
    'ALTERNATE aTTaX',
    'J.X Tiger',
    'QW Stephanie',
    'Clash Champs',
  ];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _teamName: string = '';

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public font?: Font;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);

    const rnd = Math.floor(Math.random() * this._worldChampions.length);
    this._teamName = this._worldChampions[rnd];
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
    // Change font size of the clan name and the color
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

  public get teamName(): string {
    return this._teamName;
  }
}
