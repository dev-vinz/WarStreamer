import { WarStreamerService } from './../../api/warstreamer.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _router: Router,
    private _translocoService: TranslocoService
  ) {}

  async ngOnInit(): Promise<void> {
    // Handle callback
    await this._authService.handleDiscordCallback();

    // Once user is authenticated, change the language to the user's preferred language
    const langId = this._authService.preferredLanguage;
    const lang = await this._apiService.languages.get(langId).execute();

    this._translocoService.setActiveLang(lang.shortcutValue.toLowerCase());

    // Redirect to dashboard
    this._router.navigate(['/dashboard']);
  }
}
