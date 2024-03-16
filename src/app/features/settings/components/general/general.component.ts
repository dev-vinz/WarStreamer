import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { take } from 'rxjs';

import { WarStreamerService } from '../../../../core/api/warstreamer.service';

import { ColorPickerModalComponent } from '../color-picker-modal/color-picker-modal.component';

import { Font } from '../../../../core/api/models/Font';
import { Image } from '../../../../core/api/models/Image';
import { OverlaySetting } from '../../../../core/api/models/OverlaySetting';

type FullImage = {
  element: Image;
  url: string;
  keepRatio: boolean;
  ratio: number;
};

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
})
export class GeneralComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _fonts: Font[] = [];
  private _modalService = inject(NgbModal);

  @Input()
  public images: FullImage[] = [];

  @Input()
  public overlaySetting: OverlaySetting | undefined;

  @Output()
  private modifiedChange: EventEmitter<boolean> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private _apiService: WarStreamerService) {}

  async ngOnInit(): Promise<void> {
    this._fonts = await this._apiService.fonts.getAll().execute();
    this._fonts.forEach((font) => this._createFontFaceRule(font));

    this._fonts.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async onFontChange(event: Event): Promise<void> {
    const element = event.target as HTMLInputElement;
    const fontId = element.value;

    const selectedFont = this._fonts.find((font) => font.id === fontId);

    if (
      selectedFont &&
      this.overlaySetting &&
      this.overlaySetting.fontId !== fontId
    ) {
      this.overlaySetting.fontId = fontId;
      this.modified = true;
    }
  }

  public openColorPicker(): void {
    const modalRef = this._modalService.open(ColorPickerModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.selectedColor = this.textColor;

    modalRef.closed.pipe(take(1)).subscribe((color) => {
      if (
        (color as string) &&
        this.overlaySetting &&
        this.overlaySetting.textColor !== color
      ) {
        this.overlaySetting.textColor = color as string;
        this.modified = true;
      }
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get fontId(): string | undefined {
    return this.overlaySetting?.fontId;
  }

  public get fonts(): Font[] {
    return this._fonts;
  }

  public get mirrorReflection(): boolean {
    return this.overlaySetting?.mirrorReflection ?? false;
  }

  public get selectedFontFamily(): string | undefined {
    return this._fonts.find((font) => font.id === this.overlaySetting?.fontId)
      ?.familyName;
  }

  public get textColor(): string {
    return this.overlaySetting?.textColor ?? '';
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set mirrorReflection(value: boolean) {
    if (this.overlaySetting) {
      this.overlaySetting.mirrorReflection = value;
      this.modified = true;
    }
  }

  @Input()
  public set modified(value: boolean) {
    this.modifiedChange.emit(value);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private async _createFontFaceRule(font: Font): Promise<void> {
    const fontFace = document.createElement('style');
    fontFace.textContent = `@font-face {
      font-family: '${font.familyName}';
      src: url(${await font.generateFontSource()}) format('woff');
    }`;

    document.head.appendChild(fontFace);
  }
}
