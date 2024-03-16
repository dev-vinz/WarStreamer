import { Component, Input, Renderer2 } from '@angular/core';
import { BaseComponent } from '../BaseComponent';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent extends BaseComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _height?: number;
  private _width?: number;

  @Input()
  public url: string = '';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(_renderer: Renderer2) {
    super(_renderer);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * *\
  |*             OVERRIDE            *|
  \* * * * * * * * * * * * * * * * * */

  public override lateAfterView(): void {}

  public override onSizeChanged(): void {
    // Change width and height of the image
    if (this._element) {
      this._renderer.setStyle(
        this._element.firstChild,
        'width',
        `${this._effectiveWidth}px`
      );

      this._renderer.setStyle(
        this._element.firstChild,
        'height',
        `${this._effectiveHeight}px`
      );

      this._updateTransform();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  @Input()
  public set height(value: number) {
    this._height = value;
    this.onSizeChanged();
  }

  @Input()
  public set width(value: number) {
    this._width = value;
    this.onSizeChanged();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _effectiveHeight(): number {
    return (this._height ?? 0) * this.ratio;
  }

  private get _effectiveWidth(): number {
    return (this._width ?? 0) * this.ratio;
  }
}
