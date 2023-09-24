import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {EmployeeI} from "../../model/Employee.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //static END_POINT_EMPLOYEE = environment.REST_BACKEND + '/employees';
  static END_POINT_EMPLOYEE = 'http://localhost:8080' + '/employees';
  constructor(private api : ApiService) {  }

  getEmployeeList ( ) : Observable<EmployeeI[]> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE);
  }
}
