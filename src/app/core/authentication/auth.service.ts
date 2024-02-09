import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { firstValueFrom } from 'rxjs';

import { AuthToken } from './models/AuthToken';
import { DiscordUser } from './models/DiscordUser';

import { environment } from '../../../environments/environment';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _oauthService: OAuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient
  ) {
    this._oauthService.configure({
      issuer: environment.authentication.apiIssuer,
      loginUrl: 'https://discord.com/api/oauth2/authorize',
      redirectUri: window.location.origin + '/login',
      clientId: environment.authentication.discordAppId,
      scope: 'identify email',
      responseType: 'code',
      showDebugInformation: false,
      oidc: false,
    });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public disconnect(): void {
    this._oauthService.logOut();
    this._clearLocalStorage();
    this._router.navigate(['/login']);
  }

  public async fetchDiscordUserProfile(): Promise<void> {
    try {
      const discordUser = (await firstValueFrom(
        this._http.get(`${environment.apiUrl}/auth/@me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      )) as DiscordUser;

      localStorage.setItem(
        environment.localStorage.userKey,
        JSON.stringify(discordUser)
      );
    } catch (err: any) {
      console.error('Error while fetching user profile', err);
      // localStorage.removeItem(environment.localStorage.userKey);
    }
  }

  public async handleDiscordCallback(): Promise<boolean> {
    const params = await firstValueFrom(this._route.queryParams);

    const code = params['code'];
    const state = params['state'];

    const result = await this._exchangeCodeForToken(code, state);

    if (result) {
      await this._fetchUserProfile();
    }

    return result;
  }

  public login(): void {
    this._oauthService.initCodeFlow();
  }

  public async logout(): Promise<void> {
    try {
      const isLoggedOut = await firstValueFrom(
        this._http.post(`${environment.apiUrl}/auth/logout`, null, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      );

      if (isLoggedOut) {
        this._oauthService.logOut();
        this._clearLocalStorage();
        this._router.navigate(['/login']);
      }
    } catch (err: any) {
      console.error('Error while logging out', err);
    }
  }

  public async refresh(): Promise<boolean> {
    try {
      const authToken = (await firstValueFrom(
        this._http.post(`${environment.apiUrl}/auth/refresh`, null, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      )) as AuthToken;

      localStorage.setItem(environment.localStorage.tokenKey, authToken.token);

      return true;
    } catch (err: any) {
      console.error('Error while refreshing token', err);
      // localStorage.removeItem(environment.localStorage.tokenKey);

      return false;
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get accessToken(): string {
    return localStorage.getItem(environment.localStorage.tokenKey) ?? '';
  }

  public get isAuthenticated(): boolean {
    return (
      this.accessToken !== '' &&
      this.discordUser !== undefined &&
      this.preferredLanguage !== ''
    );
  }

  public get discordUser(): DiscordUser | undefined {
    return JSON.parse(
      localStorage.getItem(environment.localStorage.userKey) ?? '{}'
    ) as DiscordUser;
  }

  public get lastAccess(): moment.Moment {
    return moment.utc(
      localStorage.getItem(environment.localStorage.lastAccessKey) ?? ''
    );
  }

  public get preferredLanguage(): string {
    return localStorage.getItem(environment.localStorage.languageKey) ?? '';
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set lastAccess(date: moment.Moment) {
    localStorage.setItem(
      environment.localStorage.lastAccessKey,
      date.toISOString()
    );
  }

  public set preferredLanguage(id: string) {
    localStorage.setItem(environment.localStorage.languageKey, id);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _clearLocalStorage(): void {
    localStorage.removeItem(environment.localStorage.languageKey);
    localStorage.removeItem(environment.localStorage.lastAccessKey);
    localStorage.removeItem(environment.localStorage.tokenKey);
    localStorage.removeItem(environment.localStorage.userKey);
  }

  private async _exchangeCodeForToken(
    code: string,
    state: string
  ): Promise<boolean> {
    try {
      const body = {
        code: code,
        codeVerifier: this._codeVerifier,
        state: state,
      };

      const authToken = (await firstValueFrom(
        this._http.post(`${environment.apiUrl}/auth/login`, body, {
          headers: { 'Content-Type': 'application/json' },
        })
      )) as AuthToken;

      localStorage.setItem(environment.localStorage.tokenKey, authToken.token);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  private async _fetchPreferredLanguage(): Promise<void> {
    try {
      const language: any = await firstValueFrom(
        this._http.get(`${environment.apiUrl}/user/language`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      );

      localStorage.setItem(environment.localStorage.languageKey, language.id);
    } catch (err: any) {
      console.error('Error while fetching preferred language', err);
      // localStorage.removeItem(environment.localStorage.languageKey);
    }
  }

  private async _fetchUserProfile(): Promise<void> {
    await this.fetchDiscordUserProfile();
    await this._fetchPreferredLanguage();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _codeVerifier(): string {
    return localStorage.getItem('PKCE_verifier') ?? '';
  }

  private get _nonce(): string {
    return localStorage.getItem('nonce') ?? '';
  }
}
