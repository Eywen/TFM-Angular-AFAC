import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {CustomerI} from "../model/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //static END_POINT_EMPLOYEE = environment.REST_BACKEND + '/employees';
  static END_POINT_EMPLOYEE = 'http://localhost:8080' + '/employees';

  // @ts-ignore
  subscriptionData: Subscription;

  constructor(private apiService: ApiService) { }

  createEmployee(employee: CustomerI): Observable<CustomerI> {
    debugger;
    return this.apiService
      .post(EmployeeService.END_POINT_EMPLOYEE, employee);
  }
}
