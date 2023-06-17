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
  errorMsg = "ff";
  succesMsg = "iniicio";
  existEmployee = 'Error: El empleado ya existe'
  iserrorMsg:boolean;
  iscreateEmployee:boolean;
  customerCreate:boolean = false;
  employee: CustomerI | null = null;

  constructor(private formBuilder: FormBuilder,private api:ApiService,private employeeService: EmployeeService) {

    this.iserrorMsg = false;
    this.iscreateEmployee = false;

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
          /*.subscribe(() =>
            this.succesMsg = formValues.employeeName + " Creado correctamente"  );*/
          .subscribe(
            () => {
              this.iscreateEmployee = true;
              this.succesMsg = formValues.employeeName + ' Creado correctamente';
            },
            error => {
              this.iserrorMsg = true;
              if (error.status === 409) {
                this.errorMsg = this.existEmployee;
              } else { // Manejo para otros errores
                this.errorMsg = 'Error al crear empleado.';
              }
            }
          );
      }
    }
  }
}
