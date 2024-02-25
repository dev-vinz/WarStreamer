import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule, provideTranslocoScope } from '@ngneat/transloco';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    NotFoundComponent,
    TitleComponent,
  ],
  providers: [provideTranslocoScope({ scope: 'shared', alias: 't' })],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons),
    RouterModule,
    TranslocoModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    ScrollToTopComponent,
    TitleComponent,
  ],
})
export class SharedModule {}
