import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './authentication/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule],
})
export class CoreModule {}
