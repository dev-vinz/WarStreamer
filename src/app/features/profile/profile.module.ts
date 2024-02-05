import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { AccountsComponent } from './components/accounts/accounts.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { DetailsComponent } from './components/details/details.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';

@NgModule({
  declarations: [
    AccountsComponent,
    DeleteModalComponent,
    DetailsComponent,
    ProfileComponent,
    UpdateModalComponent,
  ],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ProfileRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProfileModule {}
