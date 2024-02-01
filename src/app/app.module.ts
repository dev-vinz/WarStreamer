import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { CoreModule } from './core/core.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    DashboardModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.warstreamer.com', 'https://localhost:7134'],
        sendAccessToken: true,
      },
    }),
    SharedModule,
    HttpClientModule,
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: OAuthStorage,
      useFactory: (): OAuthStorage => localStorage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
