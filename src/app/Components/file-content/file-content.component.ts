import { Component } from '@angular/core';
import { MyVariablesService } from '../../Services/my-variables.service';


@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrl: './file-content.component.css'
})
export class FileContentComponent {

root: any;


constructor(
  private myVariableService: MyVariablesService,
            
  ){
}

ngOnInit():void{
  this.root = document.querySelector('#csvRoot')
  this.update(this.myVariableService.result.data.slice(1), this.myVariableService.result.data[0])  

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
