import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { SharedModule } from '../../shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { ClansComponent } from './components/clans/clans.component';
import { ColorPickerModalComponent } from './components/color-picker-modal/color-picker-modal.component';
import { DetailsComponent } from './components/details/details.component';
import { GeneralComponent } from './components/general/general.component';
import { ImagesComponent } from './components/images/images.component';
import { ScoresComponent } from './components/scores/scores.component';
import { WelcomeModalComponent } from './components/welcome-modal/welcome-modal.component';

import { AverageComponent } from './components/overlay-config/components/average/average.component';
import { ClanNameComponent } from './components/overlay-config/components/clan-name/clan-name.component';
import { EquipmentsComponent } from './components/overlay-config/components/equipments/equipments.component';
import { ImageComponent } from './components/overlay-config/components/image/image.component';
import { LastAttackComponent } from './components/overlay-config/components/last-attack/last-attack.component';
import { LogoComponent } from './components/overlay-config/components/logo/logo.component';
import { PercentageComponent } from './components/overlay-config/components/percentage/percentage.component';
import { PlayersComponent } from './components/overlay-config/components/players/players.component';
import { StarsComponent } from './components/overlay-config/components/stars/stars.component';
import { OverlayConfigComponent } from './components/overlay-config/overlay-config.component';

@NgModule({
  declarations: [
    AverageComponent,
    ClanNameComponent,
    ClansComponent,
    ColorPickerModalComponent,
    DetailsComponent,
    EquipmentsComponent,
    GeneralComponent,
    ImageComponent,
    ImagesComponent,
    LastAttackComponent,
    LogoComponent,
    OverlayConfigComponent,
    PercentageComponent,
    PlayersComponent,
    ScoresComponent,
    SettingsComponent,
    StarsComponent,
    WelcomeModalComponent,
  ],
  imports: [
    ColorPickerModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    NgbAlertModule,
    NgbNavModule,
    NgxBootstrapIconsModule.pick(allIcons),
    SettingsRoutingModule,
    SharedModule,
  ],
})
export class SettingsModule {}
