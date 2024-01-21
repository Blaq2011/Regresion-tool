import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { MyVariablesService } from '../../Services/my-variables.service';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.css'
})
export class ChartDataComponent {

//Service and template controls
  clickEventsubscription:Subscription;

//Data to plot
listOfTraces: any = [];  //stores all plot traces

//-List of neccessary variables for plot --------------
   
 y_valuesList: any = [];
 xvalue: any = [];
 

  constructor(
    private myVariableService: MyVariablesService,
  ){

    this.clickEventsubscription=    
      this.myVariableService.getClickEvent().subscribe(()=>{
      this.y_valuesList = []
      this.listOfTraces = []; // resets the list of traces on every submit of new data to prevent duplicates
      this.data_processor()
 
        })
  }

ngOnInit (){

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
       name : `${label}%`,
      //  marker:{
      //      color:colr
      //  }
       
      } 
   }

 tracesPoly (yvals: any, label: any ){
      return{
       x : this.xvalue,
       y : yvals,
       mode : 'line',
       type : 'scatter',
       name : `${label}%`,
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
     name : `${label}%`,
    //  marker:{
    //      color:colr
    //  },
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


 data_processor(){
 
  this.yListCreator(this.myVariableService.entireData[0]["firstorder"]["outquantile"])
  this.xvalue = this.myVariableService.entireData[0]["firstorder"]["outpoly"][0][1]["xaxis"]

  this.plotValuesGenerator(this.myVariableService.entireData[0]["firstorder"]["outquantile"], "scatter")  //collecting y5values, y50values and y95values for scatter plot
  this.plotValuesGenerator(this.myVariableService.entireData[0]["firstorder"]["outpoly"], "centile")  //collecting y5Polyvalues, y50Polyvalues and y95Polyvalues for centile plot
  this.plotValuesGenerator(this.myVariableService.entireData[0]["firstorder"]["outerrorbars"], "err")  //collecting y5Errorvalues, y50Errorvalues and y95Errorvalues for centile plot

  // console.log(this.myVariableService.entireData[0]["firstorder"])
  console.log("Plots: ",this.listOfTraces)
  console.log(this.xvalue);
  
}






}
