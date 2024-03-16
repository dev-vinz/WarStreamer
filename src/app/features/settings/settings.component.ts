import { Component, OnInit, inject } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { take } from 'rxjs';

import { WarStreamerService } from '../../core/api/warstreamer.service';

import { WelcomeModalComponent } from './components/welcome-modal/welcome-modal.component';

import { Image } from '../../core/api/models/Image';
import { OverlaySetting } from '../../core/api/models/OverlaySetting';

type FullImage = {
  element: Image;
  url: string;
  keepRatio: boolean;
  ratio: number;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _activeId = 1;
  private _images: FullImage[] = [];
  private _loading = true;
  private _modalService = inject(NgbModal);
  private _modified: boolean = false;
  private _processing: boolean = false;
  private _setting?: OverlaySetting;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  async ngOnInit(): Promise<void> {
    try {
      this._setting = await this._apiService.overlaySetting.get().execute();
    } catch (error) {
      // Do nothing
    }

    const images = await this._apiService.images.getAll().execute();
    const urls = await Promise.all(
      images.map(async (image) => image.generateImageUrl())
    );

    this._images = images.map((image, index) => ({
      element: image,
      url: urls[index],
      keepRatio: true,
      ratio: image.ratio,
    }));

    this._loading = false;

    // If the setting doesn't exist, open the modal to create a new setting
    if (!this._setting) {
      const modalRef = this._modalService.open(WelcomeModalComponent, {
        backdrop: 'static',
        centered: true,
        keyboard: false,
      });

      modalRef.closed.pipe(take(1)).subscribe((result) => {
        if (result) {
          this._setting = result;
        }
      });
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async cancel(): Promise<void> {
    if (this._setting) {
      this._processing = true;

      this._setting = await this._apiService.overlaySetting.get().execute();
      const images = await this._apiService.images.getAll().execute();
      const urls = await Promise.all(
        images.map(async (image) => image.generateImageUrl())
      );

      this._images = images.map((image, index) => ({
        element: image,
        url: urls[index],
        keepRatio: true,
        ratio: image.ratio,
      }));

      this._modified = false;
      this._processing = false;
    }
  }

  public async save(): Promise<void> {
    if (this._setting) {
      this._processing = true;

      const imagePromises = this._images.map(async (image) =>
        this._apiService.images
          .update(image.element.name, image.element)
          .execute()
      );

      const settingModified = !(await this._apiService.overlaySetting
        .update(this._setting)
        .execute());

      const imagesModified = !(await Promise.all(imagePromises)).every(
        (modified) => modified
      );

      this._modified = settingModified || imagesModified;

      this._processing = false;
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get activeId(): number {
    return this._activeId;
  }

  public get images(): FullImage[] {
    return this._images;
  }

  public get modified(): boolean {
    return this._modified;
  }

  public get processing(): boolean {
    return this._processing;
  }

  public get setting(): OverlaySetting | undefined {
    return this._setting;
  }

  public get valid(): boolean {
    return !this._loading && this._setting !== undefined;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set modified(value: boolean) {
    this._modified = value;
  }
}
