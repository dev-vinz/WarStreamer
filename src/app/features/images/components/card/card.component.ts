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

import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

import { Image } from '../../../../core/api/models/Image';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _imageUrl: string = '';
  private _modalService = inject(NgbModal);

  @Input()
  public image: Image | null = null;

  @Output()
  public imageDeleted: EventEmitter<void> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  async ngOnInit(): Promise<void> {
    if (this.image) {
      this._imageUrl = await this.image.generateImageUrl();
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public delete(): void {
    const modalRef = this._modalService.open(DeleteModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.imageName = this.imageName;

    modalRef.closed.pipe(take(1)).subscribe((result) => {
      if (result) {
        this.imageDeleted.emit();
      }
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get imageName(): string {
    return this.image?.name || '';
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }
}
