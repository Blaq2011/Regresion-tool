import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChartDataComponent } from './Components/chart-data/chart-data.component';

import { HttpClientModule } from '@angular/common/http';
import { DataCollectorComponent } from './Components/data-collector/data-collector.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/header/header.component';
import { FileContentComponent } from './Components/file-content/file-content.component';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DataCollectorComponent,
    HeaderComponent,
    FileContentComponent,
    ChartDataComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule,

  

  ],
  providers: [DataCollectorComponent, HTMLElement, MatIconModule,],
  bootstrap: [AppComponent, ]

})
export class AppModule { }
