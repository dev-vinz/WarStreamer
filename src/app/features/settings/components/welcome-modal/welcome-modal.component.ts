import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';
import { AuthService } from '../../../../core/authentication/auth.service';

import { OverlaySetting } from '../../../../core/api/models/OverlaySetting';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrl: './welcome-modal.component.scss',
})
export class WelcomeModalComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _EMPTY_GUID = '00000000-0000-0000-0000-00000000000';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _modal = inject(NgbActiveModal);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async create(id: number): Promise<void> {
    let defaultOverlay = new OverlaySetting(
      this._authService.discordUser!.id,
      '#FFFFFF'
    );

    try {
      const overlay = await this._apiService.overlaySetting
        .getDefaultById(this._EMPTY_GUID + id)
        .execute();

      overlay.copyTo(defaultOverlay);
    } catch (error) {
      // Do nothing, use an empty overlay
    } finally {
      defaultOverlay = await this._apiService.overlaySetting
        .add(defaultOverlay)
        .execute();
    }

    this._modal.close(defaultOverlay);
  }

  public close(): void {
    this._router.navigate(['/dashboard']);
    this._modal.close();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get modal(): NgbActiveModal {
    return this._modal;
  }
}
