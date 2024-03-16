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

  @Input()
  public selectedColor: string | undefined;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor() {
    this._pickerControl = new ColorPickerControl()
      .hideAlphaChannel()
      .hidePresets();
  }

  ngOnInit(): void {
    this._pickerControl.setValueFrom(this.selectedColor ?? ColorsTable.white);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public selectColor(): void {
    this._modal.close(this._pickerControl.value.toHexString());
  }

  public setColor(color: string): void {
    this._pickerControl.setValueFrom(color);
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
    return Array.from(
      { length: 12 },
      (_, index) => `hsl(${index * 30}, 100%, 50%)`
    ).map((hsl) => Color.from(hsl).toHexString());
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
