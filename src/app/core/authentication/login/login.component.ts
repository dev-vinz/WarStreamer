import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../auth.service';
import { WarStreamerService } from './../../api/warstreamer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _isLoading = false;
  private _modalService = inject(NgbModal);

  @ViewChild('loginFailed')
  private _errorModal!: TemplateRef<any>;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _translocoService: TranslocoService
  ) {}

  async ngOnInit(): Promise<void> {
    // Ensure user is not logged in
    if (!this._authService.isAuthenticated) {
      const params = await firstValueFrom(this._route.queryParams);

      const code = params['code'];

      // If code is not present, do nothing
      if (!code) {
        return;
      }

      this._isLoading = true;

      // Handle callback
      const isLoggedIn = await this._authService.handleDiscordCallback();

      if (!isLoggedIn) {
        this._isLoading = false;
        return this._openModal();
      }

      // Once user is authenticated, change the language to the user's preferred language
      const langId = this._authService.preferredLanguage;
      const lang = await this._apiService.languages.get(langId).execute();

      this._translocoService.setActiveLang(lang.shortcutValue.toLowerCase());

      this._isLoading = false;
    }

    // Redirect to dashboard
    this._router.navigate(['/dashboard']);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public processLogin(): void {
    this._authService.login();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get isLoading(): boolean {
    return this._isLoading;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _openModal(): void {
    this._modalService.open(this._errorModal, { centered: true });
  }
}
