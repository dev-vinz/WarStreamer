import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { firstValueFrom } from 'rxjs';

import { AuthToken } from './models/AuthToken';
import { DiscordUser } from './models/DiscordUser';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

  public async fetchUserProfile(): Promise<void> {
    await this.fetchDiscordUserProfile();
    await this._fetchPreferredLanguage();
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
      if (err.status === 401) {
        await this.refresh();
        await this.fetchDiscordUserProfile();
      }

      return;
    }
  }

  public async handleDiscordCallback(): Promise<void> {
    const params = await firstValueFrom(this._route.queryParams);

    const code = params['code'];
    const state = params['state'];

    await this._exchangeCodeForToken(code, state);
    await this.fetchUserProfile();
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
        this._router.navigate(['/']);
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public async refresh(): Promise<void> {
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
    } catch (err: any) {
      if (err.status === 401) {
        this._oauthService.logOut();
        this._clearLocalStorage();

        //! TODO: Look how to cancel the loop between the requests
        // this._oauthService.initCodeFlow();
      }
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get accessToken(): string {
    return localStorage.getItem(environment.localStorage.tokenKey) ?? '';
  }

  public get isAuthenticated(): boolean {
    return this.accessToken !== '' && this.discordUser !== undefined;
  }

  public get discordUser(): DiscordUser | undefined {
    return JSON.parse(
      localStorage.getItem(environment.localStorage.userKey) ?? '{}'
    ) as DiscordUser;
  }

  public get preferredLanguage(): string {
    return localStorage.getItem(environment.localStorage.languageKey) ?? '';
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _clearLocalStorage(): void {
    localStorage.removeItem(environment.localStorage.tokenKey);
    localStorage.removeItem(environment.localStorage.userKey);
    localStorage.removeItem(environment.localStorage.languageKey);
  }

  private async _exchangeCodeForToken(
    code: string,
    state: string
  ): Promise<void> {
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
    } catch (err: any) {
      console.error(err);
      window.alert('TODO: Something went wrong');
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
      if (err.status === 401) {
        await this.refresh();
        await this._fetchPreferredLanguage();
      }

      return;
    }
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
