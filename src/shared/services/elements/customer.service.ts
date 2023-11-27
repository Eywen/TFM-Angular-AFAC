import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {ApiService} from "../api.service";
import {AlertService} from "../alert-service.service";
import {catchError, Observable, throwError} from "rxjs";
import {EmployeeI} from "../../model/Employee.interface";
import {CustomerI} from "../../model/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  static END_POINT_EMPLOYEE = environment.REST_BACKEND + '/customers';
  //static END_POINT_EMPLOYEE = 'http://localhost:8080' + '/employees';
  private findAll = "/readall";
  private findAllActivate = "/readallactivate?";
  private findAllPage = "/readallpage?";
  private disableurl = "/disable";

  constructor(private api : ApiService, private alertService: AlertService) {  }

  getCustomerActivateListPage(page: number, size: number, order: string, asc: boolean) {
    return this.api
      .get(CustomerService.END_POINT_EMPLOYEE + this.findAllActivate + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  disable(customerId: number) {
    return this.api.put(CustomerService.END_POINT_EMPLOYEE+this.disableurl+"/"+customerId);
  }

  findCustomerById(id: number): Observable<CustomerI> {
    return this.api
      .get(CustomerService.END_POINT_EMPLOYEE+"/"+id)
      ;
  }

  createCustomer(customer: CustomerI) : Observable<CustomerI> {
    debugger;
    return this.api
      .post(CustomerService.END_POINT_EMPLOYEE, customer)
      .pipe(
        catchError(response => {
          if ([409].includes(response.status)) {
            //if (error.status === 409) {
            // Manejo específico para el estado 409
            const errorMessage = "El cliente: " + customer.customerName + " ya existe";
            //this.showMessageError(errorMessage,  5000);
            this.alertService.error(errorMessage);
          } else {

            // Si no es un error 409, propagar el error original
            this.alertService.error("Error al crear el cliente");
          }
          return throwError(response.error);
        })
      )
      ;
  }
}
