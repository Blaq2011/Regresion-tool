import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MyDataService {


  constructor(private http: HttpClient) {
    interface path {
      fileData: object
    }

   }



post_request(url: any, body: any) {

const headers = new HttpHeaders()
.set("Content-Type", "application/json")
.set("Accept", "application/json");

  return this.http.post(url, body, {headers})

}


get_request(url: any){
  return this.http.get(url)
}
}







