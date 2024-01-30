import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AuthService } from '../authentication/auth.service';

import { AccountRequests } from './requests/AccountRequests';
import { ClashClanRequests } from './requests/ClashClanRequests';
import { ClashPlayerRequests } from './requests/ClashPlayerRequests';
import { FontRequests } from './requests/FontRequests';
import { ImageRequests } from './requests/ImageRequests';
import { LanguageRequests } from './requests/LanguageRequests';
import { OverlaySettingRequests } from './requests/OverlaySettingRequests';
import { TeamLogoRequests } from './requests/TeamLogoRequests';
import { UserRequests } from './requests/UserRequests';
import { WarOverlayRequests } from './requests/WarOverlayRequests';

import { DependencyHelper } from './utils/DependencyHelper';

@Injectable({
  providedIn: 'root',
})
export class WarStreamerService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _accounts: AccountRequests;
  private _clashClans: ClashClanRequests;
  private _clashPlayers: ClashPlayerRequests;
  private _fonts: FontRequests;
  private _images: ImageRequests;
  private _languages: LanguageRequests;
  private _overlaySetting: OverlaySettingRequests;
  private _teamLogos: TeamLogoRequests;
  private _user: UserRequests;
  private _warOverlays: WarOverlayRequests;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor() {
    // Outputs
    {
      this._accounts = new AccountRequests();
      this._clashClans = new ClashClanRequests();
      this._clashPlayers = new ClashPlayerRequests();
      this._fonts = new FontRequests();
      this._images = new ImageRequests();
      this._languages = new LanguageRequests();
      this._overlaySetting = new OverlaySettingRequests();
      this._teamLogos = new TeamLogoRequests();
      this._user = new UserRequests();
      this._warOverlays = new WarOverlayRequests();
    }

    // Tools
    {
      DependencyHelper.authService = inject(AuthService);
      DependencyHelper.httpClient = inject(HttpClient);
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get accounts(): AccountRequests {
    return this._accounts;
  }

  public get clashClans(): ClashClanRequests {
    return this._clashClans;
  }

  public get clashPlayers(): ClashPlayerRequests {
    return this._clashPlayers;
  }

  public get fonts(): FontRequests {
    return this._fonts;
  }

  public get images(): ImageRequests {
    return this._images;
  }

  public get languages(): LanguageRequests {
    return this._languages;
  }

  public get overlaySetting(): OverlaySettingRequests {
    return this._overlaySetting;
  }

  public get teamLogos(): TeamLogoRequests {
    return this._teamLogos;
  }

  public get user(): UserRequests {
    return this._user;
  }

  public get warOverlays(): WarOverlayRequests {
    return this._warOverlays;
  }
}
