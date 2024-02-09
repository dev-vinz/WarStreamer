import { Component, Input } from '@angular/core';

import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public premiumLevel: number = 0;

  @Input()
  public defaultLang: string = '';

  @Input()
  public newsletter: boolean = false;

  @Input()
  public loading: boolean = false;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _authService: AuthService) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get avatarUrl(): string {
    return this._authService.discordUser?.avatar!;
  }

  public get email(): string {
    return this._authService.discordUser?.email!;
  }

  public get globalName(): string {
    return this._authService.discordUser?.globalName!;
  }

  public get id(): string {
    return this._authService.discordUser?.id!;
  }

  public get username(): string {
    return this._authService.discordUser?.username!;
  }
}
