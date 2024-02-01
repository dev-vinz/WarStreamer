import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { LoginComponent } from './authentication/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, NgxBootstrapIconsModule.pick(allIcons)],
})
export class CoreModule {}
