import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Language } from '../../core/api/models/Language';
import { User } from '../../core/api/models/User';

import { WarStreamerService } from '../../core/api/warstreamer.service';
import { AuthService } from '../../core/authentication/auth.service';

import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _languages: Language[] = [];
  private _loading: boolean = true;
  private _modalService = inject(NgbModal);

  private _defaultLang!: Language;
  private _user!: User;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  async ngOnInit(): Promise<void> {
    this._languages = await this._apiService.languages.getAll().execute();
    this._user = await this._apiService.user.get().execute();
    this._defaultLang = this._languages.find(
      (l) => l.id === this._user.languageId
    )!;

    this._loading = false;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public delete(): void {
    this._modalService.open(DeleteModalComponent, { centered: true });
  }

  public update(): void {
    const modalRef = this._modalService.open(UpdateModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.languages = this._languages;
    modalRef.componentInstance.languageId = this._user.languageId;
    modalRef.componentInstance.newsletter = this._user.newsLetter;
    modalRef.componentInstance.user = this._user;

    modalRef.closed.pipe(take(1)).subscribe((userUpdated) => {
      if (userUpdated) {
        this._user = userUpdated;
        this._defaultLang = this._languages.find(
          (l) => l.id === this._user.languageId
        )!;
      }
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get defaultLang(): string {
    return `${this._defaultLang.flagEmoji} ${this._defaultLang.displayValue}`;
  }

  public get languages(): Language[] {
    return this._languages;
  }

  public get loading(): boolean {
    return this._loading;
  }

  public get user(): User {
    return this._user;
  }
}
