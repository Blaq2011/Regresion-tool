import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlotsComponent } from './Components/plots/plots.component';
import { ChartDataComponent } from './Components/chart-data/chart-data.component';

import { HttpClientModule } from '@angular/common/http';
import { DataCollectorComponent } from './Components/data-collector/data-collector.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    PlotsComponent,
    ChartDataComponent,
    DataCollectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
