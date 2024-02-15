import { take } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';

import { AddAccountModalComponent } from '../add-account-modal/add-account-modal.component';

import { ClashPlayer } from '../../../../core/api/models/ClashPlayer';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _accounts: ClashPlayer[] = [];
  private _loading = true;
  private _modalService = inject(NgbModal);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  async ngOnInit(): Promise<void> {
    // Get all the player accounts
    const accounts = await this._apiService.accounts.getAll().execute();

    // Get the player data for each account
    accounts.forEach(async (acc) => {
      const player = await this._apiService.clashPlayers.get(acc.tag).execute();

      this._accounts.push(player);
      this._sortAccounts();
    });

    this._loading = false;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public openForm(): void {
    const modalRef = this._modalService.open(AddAccountModalComponent, {
      centered: true,
    });

    modalRef.closed.pipe(take(1)).subscribe((result) => {
      if (result as ClashPlayer) {
        this._accounts.push(result);
        this._sortAccounts();
      }
    });
  }

  public removeAccount(account: ClashPlayer): void {
    this._accounts = this._accounts.filter((acc) => acc.tag !== account.tag);
    this._sortAccounts();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get accounts(): ClashPlayer[] {
    return this._accounts;
  }

  public get loading(): boolean {
    return this._loading;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _sortAccounts(): void {
    this._accounts = this._accounts.sort((a, b) => {
      if (a.townHallLevel < b.townHallLevel) return 1;
      if (a.townHallLevel > b.townHallLevel) return -1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  }
}
