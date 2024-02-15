import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { take } from 'rxjs';

import { TeamLogo } from '../../../../core/api/models/TeamLogo';
import { TeamLogoModalComponent } from '../team-logo-modal/team-logo-modal.component';

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
  public teamAdded: EventEmitter<TeamLogo> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public async add(): Promise<void> {
    const modalRef = this._modalService.open(TeamLogoModalComponent, {
      centered: true,
    });

    modalRef.closed.pipe(take(1)).subscribe((result) => {
      if (result as TeamLogo) {
        this.teamAdded.emit(result);
      }
    });
  }
}
