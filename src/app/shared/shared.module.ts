import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule, provideTranslocoScope } from '@ngneat/transloco';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  providers: [provideTranslocoScope({ scope: 'shared', alias: 't' })],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons),
    RouterModule,
    TranslocoModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
