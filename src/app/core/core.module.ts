import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { LoginComponent } from './authentication/login/login.component';
import { SwiperDirective } from './directives/swiper.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [LoginComponent, SwiperDirective],
  imports: [CommonModule, NgxBootstrapIconsModule.pick(allIcons)],
  exports: [SwiperDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
