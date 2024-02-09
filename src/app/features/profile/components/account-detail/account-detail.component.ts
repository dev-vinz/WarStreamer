import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';

import { ClashPlayer } from '../../../../core/api/models/ClashPlayer';
import { DeviceService } from '../../../../core/services/device.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss',
})
export class AccountDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _clashAccount: ClashPlayer | null = null;
  private _touchDeleteWidth: number = 0;

  @Input()
  public account: ClashPlayer | null = null;

  @Output()
  public accountDeleted: EventEmitter<ClashPlayer> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _deviceService: DeviceService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this._clashAccount = await this._apiService.clashPlayers
        .get(this.account?.tag ?? '')
        .execute();
    } catch (error) {
      console.error(error);
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public deleteAccount(): void {
    if (this.account) {
      this._apiService.accounts.delete(this.account.tag).execute();
      this.accountDeleted.emit(this.account);
    }
  }

  public dragMoved(event: CdkDragMove): void {
    // Get the maximum right point
    const maxRight =
      event.source._dragRef['_boundaryElement'].getBoundingClientRect().right;

    // Get the current right position
    const currentRight =
      event.source.element.nativeElement.getBoundingClientRect().right;

    // Calculate the touch delete width
    this._touchDeleteWidth = maxRight - currentRight;
  }

  public dragReleased(event: CdkDragRelease): void {
    // Get the boundary and dragged elements' rectangles
    const boundaryRect =
      event.source._dragRef['_boundaryElement'].getBoundingClientRect();

    const draggedRect =
      event.source.element.nativeElement.getBoundingClientRect();

    // Reset the dragged element to its initial position
    event.source.reset();
    this._touchDeleteWidth = 0;

    // Check if the dragged element touches the left border of its boundary
    if (draggedRect.left <= boundaryRect.left) {
      this.deleteAccount();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get isTouchEnabled(): boolean {
    return this._deviceService.isMobile || this._deviceService.isTablet;
  }

  public get name(): string {
    return this.account?.name ?? '';
  }

  public get tag(): string {
    return this.account?.tag ?? '';
  }

  public get touchDeleteWidth(): number {
    return this._touchDeleteWidth;
  }

  public get townHallImage(): string {
    if (this._clashAccount) {
      return `assets/town-halls/th${this._clashAccount?.townHallLevel}.png`;
    } else {
      return '';
    }
  }

  public get townHallLevel(): number {
    return this._clashAccount?.townHallLevel ?? 0;
  }
}
