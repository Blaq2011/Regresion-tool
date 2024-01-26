import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MyVariablesService } from '../../Services/my-variables.service';


@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrl: './file-content.component.scss'
})
export class FileContentComponent {

root: any;

regressionClicked: string = ""

constructor(
  private myVariableService: MyVariablesService,
            
  ){

    
}

ngOnInit():void{


 
}


createElement(){

  const mainDiv = document.getElementById("main") 
  const newDiv = document.createElement("app-data-collector");

  console.log(newDiv)
  mainDiv?.appendChild(newDiv)
}



loadPage(result: any){
  
  this.root = document.querySelector('#csvRoot')
  this.update(result.data.slice(1), result.data[0])  
  console.log("init");
}


   update(data: any, headerColumns = []) {
    this.clear();
    this.setHeader(headerColumns);
    this.setBody(data);
  }


  clear() {
    this.root.innerHTML = "";
  }


  setHeader(headerColumns:any) {
    this.root.insertAdjacentHTML(
      "afterbegin",
      `
            <thead>
                <tr>
                    ${headerColumns.map((text: any) => `<th>${text}</th>`).join("")}
                </tr>
            </thead>
        `
    );
  }


  setBody(data:any) {
    const rowsHtml = data.map((row: any[]) => {
      return `
                <tr>
                    ${row.map((text) => `<td>${text}</td>`).join("")}
                </tr>
            `;
    });

    this.root.insertAdjacentHTML(
      "beforeend",
      `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
  }


}
