import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';
import { AuthService } from '../../../../core/authentication/auth.service';

import { Language } from '../../../../core/api/models/Language';
import { User } from '../../../../core/api/models/User';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.scss',
})
export class UpdateModalComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _modal = inject(NgbActiveModal);
  private _userForm!: FormGroup;

  @Input()
  public languages: Language[] = [];

  @Input()
  public languageId: string = '';

  @Input()
  public newsletter: boolean = false;

  @Input()
  public user: User = new User();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this._userForm = this._formBuilder.group({
      newsletter: this.newsletter,
      language: this.languageId,
    });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async update(): Promise<void> {
    this.modal.close(this.user);

    this.user.newsLetter = this._userForm.value.newsletter;
    this.user.languageId = this._userForm.value.language;

    await this._apiService.user.update(this.user).execute();

    const lang = this.languages.find((l) => l.id === this.user.languageId)!;

    this._authService.preferredLanguage = lang.id;
    this._translocoService.setActiveLang(lang.shortcutValue);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get modal(): NgbActiveModal {
    return this._modal;
  }

  public get userForm(): FormGroup {
    return this._userForm;
  }
}
