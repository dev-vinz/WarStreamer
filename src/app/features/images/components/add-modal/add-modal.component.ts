import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';
import { AuthService } from '../../../../core/authentication/auth.service';

import { Image as ApiImage } from '../../../../core/api/models/Image';
import { Location2D } from '../../../../core/api/models/Location2D';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _imageForm!: FormGroup;
  private _modal = inject(NgbActiveModal);
  private _namesTaken: string[] = [];
  private _processing: boolean = false;

  @ViewChild('imageInput')
  private _imageInput!: ElementRef<HTMLInputElement>;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private _apiService: WarStreamerService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get all the image names
    this._apiService.images
      .getAll()
      .execute()
      .then((images) => {
        this._namesTaken = images.map((image) => image.name);
      });

    // Create the image form
    this._imageForm = this._formBuilder.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async addImage(): Promise<void> {
    // Set the processing flag
    this._processing = true;

    // Mark all fields as touched
    this._imageForm.markAllAsTouched();

    // If the form is invalid, return
    if (this._imageForm.invalid) {
      this._processing = false;
      return;
    }

    // Get the different informations
    const name: string = this._imageForm.get('name')?.value.toUpperCase();
    const imageFile: File = this._imageForm.get('image')?.value;

    // Verify if the image name is already taken
    if (this._namesTaken.includes(name)) {
      this._imageForm.get('name')?.setErrors({ duplicated: true });
      this._processing = false;
      return;
    }

    // Check that name does not contain any accent characters
    // or any special characters, except for the space
    if (!/^[a-zA-Z0-9 ]*$/.test(name)) {
      this._imageForm.get('name')?.setErrors({ invalidName: true });
      this._processing = false;
      return;
    }

    // Get image dimensions
    const dimensions = await this._getImageDimensions(imageFile);

    // Create a new image
    const image = new ApiImage(
      this._authService.discordUser!.id,
      name,
      imageFile,
      new Location2D(0, 0),
      dimensions.width,
      dimensions.height,
      false
    );

    // Add the image
    const addedImage = await this._apiService.images.add(image).execute();

    this._processing = false;
    this._modal.close(addedImage);
  }

  public onFileChange(event: Event): void {
    const element = event.target as HTMLInputElement;

    if (element.files && element.files.length) {
      const file = element.files.item(0);

      if (file?.type !== 'image/png') {
        this._imageForm.patchValue({ image: null });
        this._imageForm.get('image')?.setErrors({ invalidType: true });
      } else {
        this._imageForm.patchValue({
          image: file,
        });
      }
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get imageForm(): FormGroup {
    return this._imageForm;
  }

  public get modal(): NgbActiveModal {
    return this._modal;
  }

  public get processing(): boolean {
    return this._processing;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private async _getImageDimensions(
    file: File
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };

      image.onerror = (error) => {
        reject(error);
      };

      image.src = URL.createObjectURL(file);
    });
  }
}
