import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartDataComponent } from './Components/chart-data/chart-data.component';
import { DataCollectorComponent } from './Components/data-collector/data-collector.component';
import { FileContentComponent } from './Components/file-content/file-content.component';


const routes: Routes = [ 
  {path: "", component: DataCollectorComponent},
  {path: "File Content", component: FileContentComponent},
  {path: "Charts & Stats", component: ChartDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
