import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';

import { CardComponent } from './components/card/card.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { PlaceholderCardComponent } from './components/placeholder-card/placeholder-card.component';
import { TeamLogoModalComponent } from './components/team-logo-modal/team-logo-modal.component';

@NgModule({
  declarations: [
    CardComponent,
    ConfirmDeleteModalComponent,
    PlaceholderCardComponent,
    TeamLogoModalComponent,
    TeamsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TeamsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeamsModule {}
