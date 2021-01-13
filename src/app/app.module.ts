import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {TemperatureGraphComponent} from './components/temperature-graph/temperature-graph.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ChartsModule} from 'ng2-charts';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {NgxGaugeModule} from 'ngx-gauge';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { TemperatureGaugeComponent } from './components/temperature-gauge/temperature-gauge.component';
import { HumidityGaugeComponent } from './components/humidity-gauge/humidity-gauge.component';
import { HeaterInputComponent } from './components/heater-input/heater-input.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { AutomationListComponent } from './components/automation-list/automation-list.component';
import { IfBlockComponent } from './components/automation-list/if-block/if-block.component';
import { PressureGaugeComponent } from './components/pressure-gauge/pressure-gauge.component';
import { LastUpdateTextComponent } from './components/last-update-text/last-update-text.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureGraphComponent,
    HomeScreenComponent,
    TemperatureGaugeComponent,
    HumidityGaugeComponent,
    HeaterInputComponent,
    LoginScreenComponent,
    HeaderComponent,
    AutomationListComponent,
    IfBlockComponent,
    PressureGaugeComponent,
    LastUpdateTextComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    NgxGaugeModule,
    ChartsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    // overlayContainer.getContainerElement().classList.add('Smartroom-theme');
  }
}
