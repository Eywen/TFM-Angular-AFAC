import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerI} from "../../../shared/model/customer.interface";
import {ApiService} from "../../../shared/services/api.service";
import {EmployeeService} from "../../../shared/services/employee.service";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  loginform: FormGroup;
  errorMsg:any = "inicio";
  succesMsg:any = "inicio";
  creationCustomerOK:boolean = false;
  customerCreate:boolean = false;
  employee: CustomerI | null = null;
  constructor(private formBuilder: FormBuilder,private api:ApiService,private employeeService: EmployeeService) {
    //this.prueba();

    this.loginform = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      lastName1: ['', [Validators.required, Validators.minLength(4)]],
      lastName2: [''],
      cedula: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      telephone: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

  }

  create(data: FormGroup): void {
    if (this.loginform.valid) {
      if (this.loginform.valid) {
        const formValues: CustomerI = {
          employeeName: this.loginform.get('customerName')?.value || null,
          lastName1: this.loginform.get('lastName1')?.value || null,
          lastName2: this.loginform.get('lastName2')?.value || null,
          cedula: this.loginform.get('cedula')?.value || null,
          address: this.loginform.get('address')?.value || null,
          city: this.loginform.get('city')?.value || null,
          telephone: this.loginform.get('telephone')?.value || null
        };
        console.log("forms: " +formValues);
        this.employeeService
          .createEmployee(formValues)
          .subscribe(() =>
            this.succesMsg = formValues.employeeName + " Creado correctamente"
          );
      }
    }
  }
  /*sendit(data: FormGroup){
    if (this.loginform.valid) {
      const formValues: CustomerI = {
        employeeName: this.loginform.get('customerName')?.value || null,
        lastName1: this.loginform.get('lastName1')?.value || null,
        lastName2: this.loginform.get('lastName2')?.value || null,
        cedula: this.loginform.get('cedula')?.value || null,
        address: this.loginform.get('address')?.value || null,
        city: this.loginform.get('city')?.value || null,
        telephone: this.loginform.get('telephone')?.value || null
      };

      // Aquí puedes hacer lo que necesites con el objeto formValues, como enviarlo a través de una API, procesarlo, etc.
      console.log("forValues: "+formValues);

      this.api.addCustomer(formValues).subscribe(data => {
        //this.api.getPreuba().subscribe(data => {
        console.log("data: "+data);
        this.errorMsg = "datos respuesta api get "
        if (data.status == 200) {
          this.creationCustomerOK = true;
          this.errorMsg = "Empleado creado correctamente."
          console.log("CREADO: "+this.errorMsg);
        }
      }, error => {
        this.customerCreate = true;
        console.log("ERROR RESPUESTA API: "+error);
        if (error.status == 400) {
          this.errorMsg = "Error. Hacen falta campos obligatorios";
        } else if (error.status == 409) {
          this.errorMsg = "Error. El empleado ya existe";
        } else {
          //debugger;
          this.errorMsg = "Error en cración de empleado. Contacte con el administrador del sistema: " + error.status;
        }
      })
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones.
      this.errorMsg = "Los dos campos son obligatorios\"";
      console.log("FORMULARIO NMO VALIDO: "+this.errorMsg);
    }

    console.log("fin llamada api Los dos campos son obligatorios", "F.E.N.W.")
  }*/

 // prueba(){
    /*this.api.getEmployee().subscribe(
      (response: HttpResponse<CustomerI>) => {
        this.employee = response.body;
        console.error('employee:', this.employee);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
    console.log("fin llamada api de prueba");*/
  //}

}
