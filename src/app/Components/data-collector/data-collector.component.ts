import { Component } from '@angular/core';
import { MyDataService } from '../../Services/my-data.service';
import { Papa } from 'ngx-papaparse';
import { FormBuilder } from '@angular/forms';
import { MyVariablesService } from '../../Services/my-variables.service';



@Component({
  selector: 'app-data-collector',
  templateUrl: './data-collector.component.html',
  styleUrl: './data-collector.component.css'
})
export class DataCollectorComponent {

columns: any = [];
dataLoaded: boolean = false;
myData: any = [];


columnsForm = this.formBuilder.group({
  xLabel: '',
  yLabel: ''
});

  constructor(
    private dataService: MyDataService, 
    private papa: Papa,
    private formBuilder: FormBuilder,
    private myVariableService: MyVariablesService,
    
    )
    {}



onFileSelected(event: any) {

    // if(event.target.files.length > 0) 
    //  {
    //    console.log(event.target.files[0].name);
    //  }
   this.fetch_file(event.target.files[0])

   }

fetch_file(targetFile: string | Blob){
 
  this.papa.parse(targetFile,{
    delimitersToGuess: [',', '\t', '|', ';'],
    fastMode: false,
    download: true,
    skipEmptyLines: true,

    complete: (result) => {
    console.log('Parsed: ', result);

    this.columns = result.data[0]  //saving columns
    this.dataLoaded = true
    console.log(this.columns);
    

  this.dataService.post_request( "http://127.0.0.1:8000/filepath-collector/", JSON.stringify({"fileData": result})).subscribe(
    data =>{
      console.log(data)
    }
  )


    }
    
});
}

   fetch_columns (){
     this.myData = [] ; // resets the list on every click to prevent duplicates
    this.dataService.post_request( "http://127.0.0.1:8000/submit-columns/", JSON.stringify({"xcolumnselected": this.columnsForm.value["xLabel"],"ycolumnselected": this.columnsForm.value["yLabel"] })).subscribe(
      data =>{
        console.log(data)
      }
    )
      return this.fetch_data()
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
