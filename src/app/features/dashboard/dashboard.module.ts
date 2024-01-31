import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [CardComponent, DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [],
})
export class DashboardModule {}
