import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';
import { AuthService } from '../../../../core/authentication/auth.service';

import { Account } from '../../../../core/api/models/Account';

@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrl: './add-account-modal.component.scss',
})
export class AddAccountModalComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _accForm!: FormGroup;
  private _modal = inject(NgbActiveModal);
  private _processing = false;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._accForm = this._formBuilder.group({
      tag: ['', Validators.required],
      token: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async addAccount(): Promise<void> {
    // Set the processing flag
    this._processing = true;

    // Mark all fields as touched
    this._accForm.markAllAsTouched();

    if (this._accForm.invalid) {
      this._processing = false;
      return;
    }

    // Get the tag and the token
    const token: string = this._accForm.get('token')?.value;
    const tag: string = this._accForm
      .get('tag')
      ?.value.toUpperCase()
      .replace('O', '0');

    // Verify the correspondance between the tag and the token
    const response = await this._apiService.clashPlayers
      .verify(tag, token)
      .execute();

    const isValid = response.status === 0;

    if (!isValid) {
      // Update the form validity
      this._accForm.setErrors({ invalid: true });
      this._processing = false;
      return;
    }

    // Verify if the account already exists
    let anyAccount: Account | null = null;

    try {
      anyAccount = await this._apiService.accounts.get(tag).execute();
    } catch (err: unknown) {
      // Do nothing, the account does not exist
    }

    if (anyAccount !== null) {
      // Update the form validity
      this._accForm.setErrors({ duplicated: true });
      this._processing = false;
      return;
    }

    // Add the account
    const account = new Account(tag, this._authService.discordUser?.id!);
    const addedAccount = await this._apiService.accounts.add(account).execute();

    // Get the player data
    const player = await this._apiService.clashPlayers
      .get(addedAccount.tag)
      .execute();

    this._processing = false;
    this._modal.close(player);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get accForm(): FormGroup {
    return this._accForm;
  }

  public get modal(): NgbActiveModal {
    return this._modal;
  }

  public get processing(): boolean {
    return this._processing;
  }
}
