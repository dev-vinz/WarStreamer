import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
