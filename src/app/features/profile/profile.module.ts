import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountModalComponent } from './components/add-account-modal/add-account-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { DetailsComponent } from './components/details/details.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';

@NgModule({
  declarations: [
    AccountDetailComponent,
    AccountsComponent,
    AddAccountModalComponent,
    DeleteModalComponent,
    DetailsComponent,
    ProfileComponent,
    UpdateModalComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ProfileRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProfileModule {}
