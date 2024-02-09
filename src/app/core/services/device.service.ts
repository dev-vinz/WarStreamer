import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _deviceService: DeviceDetectorService) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get isDesktop(): boolean {
    return this._deviceService.isDesktop();
  }

  public get isMobile(): boolean {
    return this._deviceService.isMobile();
  }

  public get isTablet(): boolean {
    return this._deviceService.isTablet();
  }

  public get isTouchEnabled(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
}
