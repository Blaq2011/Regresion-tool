import { Component } from '@angular/core';
import { CsvTableService } from '../../Services/csv-table.service';



@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrl: './file-content.component.scss'
})
export class FileContentComponent {

root: any;

regressionTab: string = ""

constructor(
  private csvTableService: CsvTableService,

            
  ){

    
}

ngOnInit():void{


 
}


loadPage(result: any){
  
  this.root = document.querySelector('#csvRoot')
  this.csvTableService.update(this.root,result.data.slice(1), result.data[0])  
 console.log("load called")
}

}