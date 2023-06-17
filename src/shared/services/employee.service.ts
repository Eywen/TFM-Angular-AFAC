import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {catchError, Observable, throwError} from "rxjs";
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
      .post(EmployeeService.END_POINT_EMPLOYEE, employee)
      .pipe(
        catchError(error => {
          //console.log("error: " +error);
          /*if (error.status === 409) {
            // Manejo específico para el estado 409
            const errorMessage = 'Error: El empleado ya existe';
            // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de error en el componente
            //return throwError(errorMessage);
          }*/
          // Si no es un error 409, propagar el error original
          return throwError(error);
        })
      )

      ;
  }
}
