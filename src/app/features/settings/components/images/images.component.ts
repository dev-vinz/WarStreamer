import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Image } from '../../../../core/api/models/Image';
import { OverlaySetting } from '../../../../core/api/models/OverlaySetting';

type FullImage = {
  element: Image;
  url: string;
  keepRatio: boolean;
  ratio: number;
};

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public images: FullImage[] = [];

  @Input()
  public overlaySetting: OverlaySetting | undefined;

  @Output()
  private modifiedChange: EventEmitter<boolean> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onHeightChange(image: FullImage): void {
    // If the ratio is locked, we need to change the width
    if (image.keepRatio) {
      image.element.width = Math.round(image.element.height * image.ratio);
    }

    this.modified = true;
  }

  public onRatioChange(image: FullImage): void {
    image.ratio = image.element.ratio;
  }

  public onWidthChange(image: FullImage): void {
    // If the ratio is locked, we need to change the height
    if (image.keepRatio) {
      image.element.height = Math.round(image.element.width / image.ratio);
    }

    this.modified = true;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  @Input()
  public set modified(value: boolean) {
    this.modifiedChange.emit(value);
  }
}
