import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';



@Injectable({
  providedIn: 'root'
})
export class MyVariablesService {


  public regressionClicked: string = ""

  public result:any 
  public columns: any = [];
  public entireData: any; //variable to receive entire data
  public listOfTraces: any = []
  public selectedColumns: any;

  private subject = new Subject<any>();  //listener for the Onclick command???


  constructor() { }


 

  //receives onClick feedback from chart-data component button; then loads allVals variable with data
  sendClickEvent() {   
    this.subject.next(void 0);
  }

  //This gives the plots component the go ahead to use the data from the allVals variable obtained above
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }




}
