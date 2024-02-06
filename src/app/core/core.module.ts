import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { LoginComponent } from './authentication/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, NgxBootstrapIconsModule.pick(allIcons)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
