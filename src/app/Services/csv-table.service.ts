import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvTableService {

  constructor() { }





  update(root:any,data: any, headerColumns = []) {
    this.clear(root);
    this.setHeader(root,headerColumns);
    this.setBody(root,data);
  }


  clear(root:any) {
    root.innerHTML = "";
  }


  setHeader(root:any, headerColumns:any) {
    root.insertAdjacentHTML(
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


  setBody(root:any, data:any) {
    const rowsHtml = data.map((row: any[]) => {
      return `
                <tr>
                    ${row.map((text) => `<td>${text}</td>`).join("")}
                </tr>
            `;
    });

    root.insertAdjacentHTML(
      "beforeend",
      `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
  }











}
