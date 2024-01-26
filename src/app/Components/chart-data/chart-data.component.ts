import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { MyDataService } from '../../Services/my-data.service';
import { MyVariablesService } from '../../Services/my-variables.service';
import { DataCollectorComponent } from '../data-collector/data-collector.component';



@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.scss'
})
export class ChartDataComponent  {
  

dataLoaded: boolean = false;
graph: any;
graph2: any;
graph3: any;
graph4: any;
layout: any;
config:any;

boxChecked: boolean = false;
orderEvent: string = "";  

myData: any
columns: any = [];
  
  columnsForm = this.formBuilder.group({
    xLabel: '',
    yLabel: ''
  });

availableOrders = ["firstorder", "secondorder", "thirdorder", "fourthorder"]

//Service and template controls
  clickEventsubscription:Subscription;

//Data to plot
listOfTraces: any = [];  //stores all plot traces
selectedColumns: any = []

//-List of neccessary variables for plot --------------
   
 y_valuesList: any = [];
 xvalue: any = [];
 

  constructor(
    private dataService: MyDataService, 
    private formBuilder: FormBuilder,
    private dataCollector: DataCollectorComponent,
    private myVariableService: MyVariablesService,

  ){
    this.columns = this.myVariableService.columns

    this.clickEventsubscription=    
      this.myVariableService.getClickEvent().subscribe(()=>{
      this.y_valuesList = []
      this.listOfTraces = []; // resets the list of traces on every submit of new data to prevent duplicates
      this.data_processor("firstorder", this.boxChecked)
  
 
        })
  }

ngOnInit (){

}


fetch_columns (){
  this.dataCollector.myData = [] ; // resets the list on every click to prevent duplicates

 this.dataService.post_request( "http://127.0.0.1:8000/submit-columns/", JSON.stringify({"xcolumnselected": this.columnsForm.value["xLabel"],"ycolumnselected": this.columnsForm.value["yLabel"] })).subscribe(
   data =>{
     console.log(data)
     this.selectedColumns = [this.columnsForm.value["xLabel"],this.columnsForm.value["yLabel"]]
   }
 )
   return this.dataCollector.fetch_data()
}




plotValuesGenerator(data : any, keys:string){
  
  for (let i = 0; i < data.length; i ++){
if(keys === "scatter"){
  this.listOfTraces.push(this.tracesScatter(data[i][1]["y"], data[i][0]))   //gets vital values for scatter plot trace generation
}
else if(keys === "centile"){
  this.listOfTraces.push(this.tracesPoly(data[i][1]["ypoly"], data[i][0]))   //gets vital values for centile plot trace generation
}

else{
  this.listOfTraces.push(this.tracesScatterError(this.y_valuesList[i], data[i][0], data[i][1]["y_high"], data[i][1]["y_low"]))   //gets vital values for error bars trace generation
}
  
   
 }
 
}


 
    //Creating traces for plotting starts
tracesScatter (yvals: any, label: any ){
      return{
       x : this.xvalue,
       y : yvals,
       mode : 'markers',
       type : 'scatter',
       name : `${label}% scatter`,
       marker:{
           color:"black"
       }
       
      } 
   }

 tracesPoly (yvals: any, label: any ){
      return{
       x : this.xvalue,
       y : yvals,
       mode : 'line',
       type : 'scatter',
       name : `${label}% curve`,
      //  marker:{
      //      color:colr
      //  }

      } 
   }

   tracesScatterError (yvals: any, label: any, err_high: any ,err_low: any ){
    return{
     x : this.xvalue,
     y : yvals,
     mode : 'markers',
     type: 'data',
     name : `${label}% err`,
     marker:{
         color:"black"
     },
     error_y:{
     symmetric: false,
     array: err_high,
     arrayminus: err_low
     }
    } 
 }


yListCreator(data: []){
  for (let i = 0; i < data.length; i ++){
    this.y_valuesList.push(data[i][1]["y"])
  }
 console.log("scatter yvalues:",this.y_valuesList);
 
}


selectedOrder(event: any){
  // this.data_processor(event.target.value)
this.orderEvent = event.target.value
this.refresh_plot()
}


checkbox(event:any){
this.boxChecked = event.target.checked
console.log(event.target.checked)
this.refresh_plot()

}



refresh_plot(){

  this.y_valuesList = []
  this.listOfTraces = [];


  if(this.orderEvent === "firstorder"){
    this.data_processor("firstorder", this.boxChecked)
  } else if(this.orderEvent === "secondorder"){
    this.data_processor("secondorder", this.boxChecked)
  }else if(this.orderEvent === "thirdorder"){
    this.data_processor("thirdorder", this.boxChecked)
  }else{
    this.data_processor("fourthorder", this.boxChecked)
  }
}



 data_processor(order: any, checkbox:boolean){

  this.yListCreator(this.myVariableService.entireData[0][`${order}`]["outquantile"])
  this.xvalue = this.myVariableService.entireData[0][`${order}`]["outpoly"][0][1]["xaxis"]

  if(checkbox === false){
    this.plotValuesGenerator(this.myVariableService.entireData[0][`${order}`]["outquantile"], "scatter")  //collecting y5values, y50values and y95values for scatter plot
    this.plotValuesGenerator(this.myVariableService.entireData[0][`${order}`]["outpoly"], "centile")  //collecting y5Polyvalues, y50Polyvalues and y95Polyvalues for centile plot
  } else{
    this.plotValuesGenerator(this.myVariableService.entireData[0][`${order}`]["outquantile"], "scatter")  //collecting y5values, y50values and y95values for scatter plot
    this.plotValuesGenerator(this.myVariableService.entireData[0][`${order}`]["outpoly"], "centile")  //collecting y5Polyvalues, y50Polyvalues and y95Polyvalues for centile plot
    this.plotValuesGenerator(this.myVariableService.entireData[0][`${order}`]["outerrorbars"], "err")  //collecting y5Errorvalues, y50Errorvalues and y95Errorvalues for centile plot
  
  }
 
  // console.log(this.myVariableService.entireData[0]["firstorder"])
  console.log("Plots: ",this.listOfTraces)
  console.log(this.xvalue);

  this.dataLoaded = true 
  // this.plotComponent.show_plot()
  this.show_plot()
  
}



  show_plot(){       

    this.graph = {
      
    data: this.listOfTraces,
    
    layout : { 
        // title: this.title,
        xaxis: {
          title: this.selectedColumns[0],
          // range: [this.xstart, this.xend]
        },
        yaxis: {
          title: this.selectedColumns[1],
          // range: [this.ystart, this.yend]
        },
        autosize: true,
        // width: 800,
        height: 600,
      },

      config : {responsive: true}
      
  
    }

    console.log(this.graph);
  }


  }




