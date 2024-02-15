import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
})
export class SwiperDirective implements AfterViewInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public config?: SwiperOptions;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _el: ElementRef<SwiperContainer>) {}

  ngAfterViewInit(): void {
    Object.assign(this._el.nativeElement, this.config);

    this._el.nativeElement.initialize();
  }
}
