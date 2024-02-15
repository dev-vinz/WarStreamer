import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { TranslocoRootModule } from './transloco-root.module';

import { CoreModule } from './core/core.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { HomeModule } from './features/home/home.module';
import { ProfileModule } from './features/profile/profile.module';
import { TeamsModule } from './features/teams/teams.module';
import { SharedModule } from './shared/shared.module';

import { register } from 'swiper/element/bundle';

// Register Swiper elements
register();

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    DashboardModule,
    HomeModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
    OAuthModule.forRoot(),
    ProfileModule,
    SharedModule,
    HttpClientModule,
    TeamsModule,
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
