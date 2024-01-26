import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyVariablesService } from '../../Services/my-variables.service';
import { DataCollectorComponent } from '../data-collector/data-collector.component';
import { FileContentComponent } from '../file-content/file-content.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {



  constructor(
    private dataCollector: DataCollectorComponent,
    private myVariableService: MyVariablesService,
    private fileContent: FileContentComponent

    
    ){}

    onFileSelected(event: any) {
      this.dataCollector.fetch_file(event.target.files[0])

      }


    regressionClicked(){
      this.fileContent.createElement()
      console.log("clicked")
      }

}
