import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {EmployeeI} from "../../model/Employee.interface";
import {catchError, Observable, throwError} from "rxjs";
import {CustomerI} from "../../model/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //static END_POINT_EMPLOYEE = environment.REST_BACKEND + '/employees';
  static END_POINT_EMPLOYEE = 'http://localhost:8080' + '/employees';
  private findAll = "/readall";
  private findAllPage = "/readallpage?";
  constructor(private api : ApiService) {  }

  getEmployeeList ( ) : Observable<EmployeeI[]> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE + this.findAll);
  }

  getEmployeeListPage(page: number, size: number, order: string, asc: boolean):Observable<any[]> {
    return this.api
      .get(EmployeeService.END_POINT_EMPLOYEE + this.findAllPage + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  createEmployee(employee: EmployeeI): Observable<EmployeeI> {
    debugger;
    return this.api
      .post(EmployeeService.END_POINT_EMPLOYEE, employee)
      .pipe(
        catchError(error => {
          console.log("error: " + error.status);
          if (error.status === 409) {
            // Manejo específico para el estado 409
            const errorMessage = 'Error: El empleado ya existe';
            // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de error en el componente
            return throwError(errorMessage);
          }
          // Si no es un error 409, propagar el error original
          return throwError(error);
        })
      )

      ;
  }
}
