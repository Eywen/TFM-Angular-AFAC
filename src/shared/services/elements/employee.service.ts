import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {EmployeeI} from "../../model/Employee.interface";
import {catchError, Observable, throwError} from "rxjs";
import {CustomerI} from "../../model/customer.interface";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  static END_POINT_EMPLOYEE = environment.REST_BACKEND + '/employees';
  //static END_POINT_EMPLOYEE = 'http://localhost:8080' + '/employees';
  private findAll = "/readall";
  private findAllActivate = "/readallactivate?";
  private findAllPage = "/readallpage?";
  private disableurl = "/disable";
  constructor(private api : ApiService) {  }

  getEmployeeList ( ) : Observable<EmployeeI[]> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE + this.findAll);
  }

  getEmployeeListPage(page: number, size: number, order: string, asc: boolean):Observable<any[]> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE + this.findAllPage + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  getEmployeeActivateListPage(page: number, size: number, order: string, asc: boolean):Observable<any[]> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE + this.findAllActivate + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  createEmployee(employee: EmployeeI): Observable<EmployeeI> {
    debugger;
    return this.api
      .post(EmployeeService.END_POINT_EMPLOYEE, employee)
      .pipe(
        catchError(response => {
          if ([409].includes(response.status)){
          //if (error.status === 409) {
            // Manejo específico para el estado 409
            const errorMessage = "El empleado con cedula: " +employee.cedula +" ya existe";
            this.showMessageError(errorMessage,  5000);
          }
          // Si no es un error 409, propagar el error original
          return throwError(response.error);
        })
      )

      ;
  }

  findEmployeeById(id: number): Observable<EmployeeI> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE+"/"+id)
      ;

  }

  update(id: number, employee: EmployeeI) {
    return this.api
      //.successful()
      .put(EmployeeService.END_POINT_EMPLOYEE+"/"+id,employee)
      //.pipe()
      ;
  }

  disable(id: number) {
    return this.api.put(EmployeeService.END_POINT_EMPLOYEE+this.disableurl+"/"+id);
  }

  showMessageError(message: string, duration:number){
    this.api.showError(message, duration);
  }
  showMessageSuccess(message: string, duration:number){
    this.api.showSucces(message, duration);
  }

}
