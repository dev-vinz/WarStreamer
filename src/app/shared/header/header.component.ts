import { Component, HostListener, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { Language } from '../../core/api/models/Language';

import { WarStreamerService } from '../../core/api/warstreamer.service';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _isMenuOpen: boolean = false;
  private _languages: Language[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _authService: AuthService,
    private _apiService: WarStreamerService,
    private _translocoService: TranslocoService
  ) {}

  async ngOnInit(): Promise<void> {
    // Loads the languages
    this._languages = await this._apiService.languages.getAll().execute();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public changeLanguage(code: string): void {
    this._translocoService.setActiveLang(code.toLowerCase());
  }

  public closeMenu(): void {
    if (this._isMobile && this._isMenuOpen) {
      this.toggleMenu();
    }
  }

  public processLogin(): void {
    this._authService.login();
  }

  public processLogout(): void {
    this._authService.logout();
  }

  public toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
    document.body.classList.toggle('ws-menu-open');
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    if (event.target.innerWidth > 991 && this._isMenuOpen) {
      this.toggleMenu();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get activeLanguage(): Language | undefined {
    return this._languages.find(
      (language) =>
        language.shortcutValue.toLowerCase() ===
        this._translocoService.getActiveLang().toLowerCase()
    );
  }

  public get avatarUrl(): string {
    return this._authService.discordUser?.avatar ?? '';
  }

  public get isAuthenticated(): boolean {
    return this._authService.isAuthenticated;
  }

  public get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  public get languages(): Language[] {
    return this._languages;
  }

  public get username(): string {
    return this._authService.discordUser?.globalName ?? '';
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get _isMobile(): boolean {
    return window.innerWidth < 992;
  }
}
