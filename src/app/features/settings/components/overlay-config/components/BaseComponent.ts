import { CdkDragMove } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { Location2D } from '../../../../../core/api/models/Location2D';

@Component({ template: '' })
export abstract class BaseComponent implements AfterViewInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _size?: number;

  protected _location: Location2D = new Location2D(0, 0);

  @Input()
  public borderColor: string = 'transparent';

  @Input()
  public container?: HTMLDivElement;

  @Input()
  public draggable: boolean = false;

  @Input()
  public ratio: number = 1;

  @Output()
  public locationXChange: EventEmitter<number | undefined> = new EventEmitter();

  @Output()
  public locationYChange: EventEmitter<number | undefined> = new EventEmitter();

  @Output()
  public modified: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('element')
  private _elementRef?: ElementRef<HTMLDivElement>;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(protected _renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lateAfterView();
      this.onSizeChanged();
      this._updateTransform();
    }, 200);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onMoved(event: CdkDragMove): void {
    // Get the container element
    const container = event.source.element.nativeElement.parentElement
      ?.parentElement as HTMLDivElement;

    // Get his dimensions
    const containerRect = container.getBoundingClientRect();

    // Get the dragged element dimensions
    const draggedRect =
      event.source.element.nativeElement.getBoundingClientRect();

    // Get the vertical and horizontal distances
    const offsetX = draggedRect.left - containerRect.left;
    const offsetY = draggedRect.top - containerRect.top;

    // Get the effective location
    let locationX = Math.round(offsetX / this.ratio);
    let locationY = Math.round(offsetY / this.ratio);

    // Verify the location is inside the container
    if (locationX < 0) locationX = 0;
    if (locationX > containerRect.width) locationX = containerRect.width;
    if (locationY < 0) locationY = 0;
    if (locationY > containerRect.height) locationY = containerRect.height;

    // Set new locations
    this.locationX = locationX;
    this.locationY = locationY;

    this.modified.emit(true);
  }

  public abstract lateAfterView(): void;

  public abstract onSizeChanged(): void;

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  @Input()
  public set locationX(value: number) {
    this._location.x = value;
    this.locationXChange.emit(value);
    this._updateTransform();
  }

  @Input()
  public set locationY(value: number) {
    this._location.y = value;
    this.locationYChange.emit(value);
    this._updateTransform();
  }

  @Input()
  public set size(value: number | undefined) {
    this._size = value;
    this.onSizeChanged();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROTECTED                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  protected _updateTransform(): void {
    if (this._elementRef) {
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'transform',
        this._transform
      );

      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'border-color',
        this.borderColor
      );

      this._renderer.setStyle(this._elementRef.nativeElement, 'opacity', '1');
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  protected get _element(): HTMLDivElement | undefined {
    return this._elementRef?.nativeElement;
  }

  protected get _sizePercentage(): number {
    return ((this._size ?? 100) * this.ratio) / 100;
  }

  protected get _sizePixel(): number {
    return Math.round((this._size ?? 16) * this.ratio);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _centerOffsetX(): number {
    return this._elementRef
      ? Math.round(this._elementRef.nativeElement.clientWidth / 2)
      : 0;
  }

  private get _centerOffsetY(): number {
    return this._elementRef
      ? Math.round(this._elementRef.nativeElement.clientHeight / 2)
      : 0;
  }

  private get _transform(): string {
    if (this._location) {
      return `translate(
        ${Math.round(this._location.x * this.ratio) - this._centerOffsetX}px,
        ${Math.round(this._location.y * this.ratio) - this._centerOffsetY}px)`;
    }

    return '';
  }
}
