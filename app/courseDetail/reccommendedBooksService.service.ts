import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
//import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";



@Injectable()
export class ReccBooksService {

  private serverUrl = "https://www.googleapis.com/books/v1/volumes?q=";


  constructor(private http: HttpClient) { }

//get json from google api and returns it as a promise
getBooks(course):Promise<any>{

return this.http
    .get(this.serverUrl+ course+'+subject')
    .toPromise();
}


}
