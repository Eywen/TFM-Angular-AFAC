import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerI} from "../model/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseurl = "http://fenw.etsisi.upm.es:10000";

  constructor(private http: HttpClient) { }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addCustomer(form:CustomerI):Observable<HttpResponse<Object>>{
    let direccion = this.baseurl + "/customers";
    return this.http.post(direccion,form,{observe: 'response'});
  }
}
