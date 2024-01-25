import { Component } from '@angular/core';
import { MyDataService } from '../../Services/my-data.service';
import { Papa } from 'ngx-papaparse';
import { MyVariablesService } from '../../Services/my-variables.service';




@Component({
  selector: 'app-data-collector',
  templateUrl: './data-collector.component.html',
  styleUrl: './data-collector.component.css'
})
export class DataCollectorComponent {

myData: any = [];



  constructor(
    private dataService: MyDataService, 
    private papa: Papa,
    private myVariableService: MyVariablesService,

    )
    {}

// onFileSelected(event: any) {
//    this.fetch_file(event.target.files[0])
//    }

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
