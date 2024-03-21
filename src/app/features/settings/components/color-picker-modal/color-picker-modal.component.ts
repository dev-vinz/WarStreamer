import { Component, Input, OnInit, inject } from '@angular/core';

import {
  Color,
  ColorPickerControl,
  ColorsTable,
} from '@iplab/ngx-color-picker';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-picker-modal',
  templateUrl: './color-picker-modal.component.html',
  styleUrl: './color-picker-modal.component.scss',
})
export class ColorPickerModalComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _modal = inject(NgbActiveModal);
  private _pickerControl: ColorPickerControl;
  private _transparentSelected: boolean = false;

  @Input()
  public selectedColor: string | undefined;

  @Input()
  public isTransparent: boolean = false;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor() {
    this._pickerControl = new ColorPickerControl()
      .hideAlphaChannel()
      .hidePresets();
  }

  ngOnInit(): void {
    if (this.isTransparent && !this.selectedColor) {
      this._transparentSelected = true;
      this._pickerControl.setValueFrom(ColorsTable.transparent);
    } else {
      this._pickerControl.setValueFrom(this.selectedColor ?? ColorsTable.white);
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public selectColor(): void {
    if (this._transparentSelected) {
      this._modal.close(undefined);
    } else {
      this._modal.close(this._pickerControl.value.toHexString());
    }
  }

  public setColor(color: string): void {
    this._pickerControl.setValueFrom(color);
    this._transparentSelected = false;
  }

  public setTransparent(): void {
    this._pickerControl.setValueFrom(ColorsTable.transparent);
    this._transparentSelected = true;
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get blueValue(): number {
    return Math.round(this._pickerControl.value.getRgba().blue);
  }

  public get colorValue(): string {
    return this._pickerControl.value.toHexString();
  }

  public get greenValue(): number {
    return Math.round(this._pickerControl.value.getRgba().green);
  }

  public get hexValue(): string {
    return this._pickerControl.value.toHexString().slice(1);
  }

  public get isTransparentSelected(): boolean {
    return this._transparentSelected;
  }

  public get modal(): NgbActiveModal {
    return this._modal;
  }

  public get pickerControl(): ColorPickerControl {
    return this._pickerControl;
  }

  public get redValue(): number {
    return Math.round(this._pickerControl.value.getRgba().red);
  }

  public get rainbowColors(): string[] {
    const length = this.isTransparent ? 11 : 12;

    return Array.from(
      { length },
      (_, index) => `hsl(${index * 30}, 100%, 50%)`
    ).map((hsl) => Color.from(hsl).toHexString());
  }

  public get transparentUrl(): string {
    return "url('assets/images/settings/transparent.jpg')";
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set blueValue(value: number) {
    const rgba = this._pickerControl.value.getRgba();
    rgba.blue = value;

    this._pickerControl.setValueFrom(rgba);
  }

  public set greenValue(value: number) {
    const rgba = this._pickerControl.value.getRgba();
    rgba.green = value;

    this._pickerControl.setValueFrom(rgba);
  }

  public set hexValue(value: string) {
    if (value.length === 6) {
      this._pickerControl.setValueFrom(`#${value}`);
    }
  }

  public set redValue(value: number) {
    const rgba = this._pickerControl.value.getRgba();
    rgba.red = value;

    this._pickerControl.setValueFrom(rgba);
  }
}
