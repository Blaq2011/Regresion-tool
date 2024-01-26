import { Component } from '@angular/core';
import { MyDataService } from '../../Services/my-data.service';
import { Papa } from 'ngx-papaparse';
import { MyVariablesService } from '../../Services/my-variables.service';
import { Router } from '@angular/router';
import { FileContentComponent } from '../file-content/file-content.component';




@Component({
  selector: 'app-data-collector',
  templateUrl: './data-collector.component.html',
  styleUrl: './data-collector.component.scss'
})
export class DataCollectorComponent {

myData: any = [];


mainSectionActive = "closedMainSection"
switchMatIcon1 = "firstMatIconActive"
switchMatIcon2 = "secondMatIconInactive"

  constructor(
    private dataService: MyDataService, 
    private papa: Papa,
    private myVariableService: MyVariablesService,
    private fileContent: FileContentComponent,
    // private router: Router,
    )
    {}


openDuckerClicked(){
  this.mainSectionActive = "openedMainSection"
  this.switchMatIcon1 = "firstMatIconInactive"
  this.switchMatIcon2 = "secondMatIconActive"
}


closeDuckerClicked(){
  this.mainSectionActive = "closedMainSection"
  this.switchMatIcon2 = "secondMatIconInactive"
  this.switchMatIcon1 = "firstMatIconActive"
}


fetch_file(targetFile: string | Blob){
 
  this.papa.parse(targetFile,{
    delimitersToGuess: [',', '\t', '|', ';'],
    fastMode: false,
    download: true,
    skipEmptyLines: true,
    // preview: 100,


    complete: (result) => {
    console.log('Parsed: ', result);
    this.createCsv(targetFile)

    this.myVariableService.columns = result.data[0]  //saving columns
    console.log(this.myVariableService.columns);
   
  this.dataService.post_request( "http://127.0.0.1:8000/filepath-collector/", JSON.stringify({"fileData": result})).subscribe(
    data =>{
      console.log(data)
    }
  )

    }
    
});

}


createCsv(targetFile: string | Blob){


  this.papa.parse( targetFile,{
    delimitersToGuess: [',', '\t', '|', ';'],
    fastMode: false,
    download: true,
    skipEmptyLines: true,
    preview: 100,


    complete: (result) => {
    this.myVariableService.result = result
    this.fileContent.loadPage(result)

    //  this.router.navigateByUrl('File Content')
   
}

});


}

   fetch_data(){
    this.myData = [] ; // resets the list on every click to prevent duplicates
    this.dataService.get_request("http://localhost:8000/get-data/").subscribe(
      data =>{
        this.myData.push(data);
        console.log("my data",this.myData);
        this.sendVariables()    // This method stores and sends data
      }
    )

   }


       //This method stores variables to be accessed by plot components and sends them to variable service
       sendVariables(){
        this.myVariableService.entireData = this.myData;
        this.myVariableService.sendClickEvent();
  
      }
      
}
