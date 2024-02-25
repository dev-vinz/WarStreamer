import { Component, EventEmitter, Output, inject } from '@angular/core';

import { take } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Image } from '../../../../core/api/models/Image';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
  selector: 'app-placeholder-card',
  templateUrl: './placeholder-card.component.html',
  styleUrl: './placeholder-card.component.scss',
})
export class PlaceholderCardComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _modalService = inject(NgbModal);

  @Output()
  public imageAdded: EventEmitter<Image> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public add(): void {
    const modalRef = this._modalService.open(AddModalComponent, {
      centered: true,
    });

    modalRef.closed.pipe(take(1)).subscribe((result) => {
      if (result as Image) {
        this.imageAdded.emit(result);
      }
    });
  }
}
