import { Component } from '@angular/core';
import { DataCollectorComponent } from '../data-collector/data-collector.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {



  constructor(
    private dataCollector: DataCollectorComponent
    
    ){}


    onFileSelected(event: any) {
      this.dataCollector.fetch_file(event.target.files[0])
      }
   


}
