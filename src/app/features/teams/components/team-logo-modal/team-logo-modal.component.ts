import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';
import { AuthService } from '../../../../core/authentication/auth.service';

import { ClashClan } from '../../../../core/api/models/ClashClan';
import { TeamLogo } from '../../../../core/api/models/TeamLogo';

@Component({
  selector: 'app-team-logo-modal',
  templateUrl: './team-logo-modal.component.html',
  styleUrl: './team-logo-modal.component.scss',
})
export class TeamLogoModalComponent implements AfterViewInit, OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _clanSearch = new Subject<string>();
  private _clansLoading: boolean = false;
  private _clansRegistered: ClashClan[] = [];
  private _clansSuggested: ClashClan[] = [];
  private _modal = inject(NgbActiveModal);
  private _namesTaken: string[] = [];
  private _processing: boolean = false;
  private _teamForm!: FormGroup;

  @ViewChild('clanSearch')
  private _clanSearchInput!: ElementRef<HTMLInputElement>;

  @ViewChild('teamLogo')
  private _teamLogoInput!: ElementRef<HTMLInputElement>;

  @Input()
  public existingTeamLogo: TeamLogo | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    if (this.isUpdating) {
      // Set the file input value
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(this.existingTeamLogo!.logo);

      this._teamLogoInput.nativeElement.files = dataTransfer.files;

      // Dispatch the change event
      this._teamLogoInput.nativeElement.dispatchEvent(new Event('change'));
    }
  }

  ngOnInit(): void {
    // Define the behavior of the clan search
    this._clanSearch
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((term) => term.length >= 3),
        switchMap((term) => this._apiService.clashClans.get(term).execute())
      )
      .subscribe((clans) => {
        this._clansSuggested = clans.filter(
          (c) => !this._tags.value.includes(c.tag)
        );
        this._clansLoading = false;
      });

    // Get all the team logos
    this._apiService.teamLogos
      .getAll()
      .execute()
      .then((logos) => {
        this._namesTaken = logos.map((tl) => tl.teamName);
      });

    // Create the team form
    this._teamForm = this._formBuilder.group({
      name: ['', Validators.required],
      logo: [null, Validators.required],
      tags: this._formBuilder.array<string>([]),
    });

    // If the team logo is being updated, set the form values
    if (this.isUpdating) {
      // Set name and logo
      this._teamForm.patchValue({
        name: this.existingTeamLogo!.teamName,
        logo: this.existingTeamLogo!.logo,
      });

      // Disable the name field
      this._teamForm.get('name')?.disable();

      // Set the tags
      this.existingTeamLogo!.clanTags.forEach(async (tag) => {
        this._tags.push(this._formBuilder.control(tag));
        this._clansRegistered.push(
          await this._apiService.clashClans.getByTag(tag).execute()
        );
      });
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async addClan(tag: string): Promise<void> {
    if (!this._tags.value.includes(tag)) {
      this._tags.push(this._formBuilder.control(tag));
      this._clansSuggested = [];
      this._clanSearchInput.nativeElement.value = '';

      this._clansRegistered.push(
        await this._apiService.clashClans.getByTag(tag).execute()
      );
    }
  }

  public async addTeamLogo(): Promise<void> {
    // Set the processing flag
    this._processing = true;

    // Mark all fields as touched
    this._teamForm.markAllAsTouched();

    // Check if the clans contain at least 1 clan
    if (this._tags.length === 0) {
      this._tags.setErrors({ empty: true });
      this._processing = false;
      return;
    }

    if (this._teamForm.invalid) {
      this._processing = false;
      return;
    }

    // Get the different informations
    const name: string = this._teamForm.get('name')?.value.toUpperCase();
    const logo: File = this._teamForm.get('logo')?.value;
    const tags: string[] = this._tags.value;

    // Verify if the team name is already taken
    if (this._namesTaken.includes(name) && !this.isUpdating) {
      this._teamForm.get('name')?.setErrors({ duplicated: true });
      this._processing = false;
      return;
    }

    // Check that name does not contain any accent characters
    // or any special characters, except for the space
    if (!/^[a-zA-Z0-9 ]*$/.test(name)) {
      this._teamForm.get('name')?.setErrors({ invalidName: true });
      this._processing = false;
      return;
    }

    // Update the team logo if it is being updated
    if (this.isUpdating) {
      this.existingTeamLogo!.logo = logo;
      this.existingTeamLogo!.clanTags = tags;

      const result = await this._apiService.teamLogos
        .update(this.existingTeamLogo!.teamName, this.existingTeamLogo!)
        .execute();

      this._processing = false;
      return this._modal.close(this.existingTeamLogo);
    }

    // Otherwise, create a new team logo
    const teamLogo = new TeamLogo(
      name,
      this._authService.discordUser!.id,
      logo,
      tags
    );

    // Add the team logo
    const addedLogo = await this._apiService.teamLogos.add(teamLogo).execute();

    this._processing = false;
    this._modal.close(addedLogo);
  }

  public onFileChange(event: Event): void {
    const element = event.target as HTMLInputElement;

    if (element.files && element.files.length) {
      const file = element.files.item(0);

      if (file?.type !== 'image/png') {
        this._teamForm.patchValue({ logo: null });
        this._teamForm.get('logo')?.setErrors({ invalidType: true });
      } else {
        this._teamForm.patchValue({
          logo: file,
        });
      }
    }
  }

  public onInputChange(event: Event): void {
    const element = event.target as HTMLInputElement;

    this._clansSuggested = [];
    this._clansLoading = true;
    this._clanSearch.next(element.value);
  }

  public removeClan(index: number): void {
    this._tags.removeAt(index);
    this._clansRegistered.splice(index, 1);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get clansLoading(): boolean {
    return this._clansLoading && this._isMin3Chars;
  }

  public get clansEmpty(): boolean {
    return this._clansSuggested.length === 0 && !this.clansLoading;
  }

  public get clansRegistered(): ClashClan[] {
    return this._clansRegistered;
  }

  public get clansSuggested(): ClashClan[] {
    return this._clansSuggested;
  }

  public get isUpdating(): boolean {
    return this.existingTeamLogo !== null;
  }

  public get modal(): NgbActiveModal {
    return this._modal;
  }

  public get processing(): boolean {
    return this._processing;
  }

  public get teamForm(): FormGroup {
    return this._teamForm;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _convertBase64ToFile(base64: any, name: string): File {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: 'image/png' });
    return new File([blob], `${name}.png`, { type: 'image/png' });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _isMin3Chars(): boolean {
    return this._clanSearchInput?.nativeElement.value.length >= 3;
  }

  private get _tags(): FormArray {
    return this._teamForm.get('tags') as FormArray;
  }
}
