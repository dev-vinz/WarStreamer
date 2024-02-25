import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { SharedModule } from '../../shared/shared.module';

import { ImagesRoutingModule } from './images-routing.module';
import { ImagesComponent } from './images.component';

import { AddModalComponent } from './components/add-modal/add-modal.component';
import { CardComponent } from './components/card/card.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { PlaceholderCardComponent } from './components/placeholder-card/placeholder-card.component';

@NgModule({
  declarations: [
    AddModalComponent,
    CardComponent,
    DeleteModalComponent,
    ImagesComponent,
    PlaceholderCardComponent,
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ImagesModule {}
