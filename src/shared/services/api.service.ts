import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {CustomerI} from "../model/customer.interface";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseurl = "http://127.0.0.1:8080";



    constructor(private http: HttpClient) { }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addCustomer(form:CustomerI):Observable<HttpResponse<CustomerI>>{
    let direccion = this.baseurl + "/employee";
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization",  'Basic ' + btoa('user:20755980-7db6-4305-bcfc-98cf4af04fee'));
    return this.http.post<CustomerI>(direccion,form,{headers,observe: 'response'});
  }

  /*getPreuba() :Observable<HttpResponse<CustomerI>>{
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization",  'Basic ' + btoa('user:62cf4700-12f3-459d-bba5-99d7b05e57f7'));
    let direccion = this.baseurl + "/employee";
    console.log("se va a llamar a la url: "+ direccion);
    return this.http.get<CustomerI>(direccion,{headers,observe: 'response'});
  }*/

  getEmployee(): Observable<HttpResponse<CustomerI>> {
    const url = this.baseurl + "/employee";

    return this.http.get<CustomerI>(url, { observe: 'response' }).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
