import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerI} from "../../../shared/model/customer.interface";
import {ApiService} from "../../../shared/services/api.service";
//import {EmployeeService} from "../../../shared/services/employee.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {EmployeeI} from "../../../shared/model/Employee.interface";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add_old.component.html',
  styleUrls: ['./employee-add_old.component.css']
})
export class EmployeeAdd_oldComponent {

  loginform: FormGroup;
  employeeform: FormGroup;
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

    this.employeeform = this.formBuilder.group({
      employeeName: ['', [Validators.required, Validators.minLength(2)]],
      employeeLastName1: ['', [Validators.required, Validators.minLength(4)]],
      employeeLastName2: [''],
      employeeCedula: ['', [Validators.required, Validators.minLength(4)]],
      employeeAddress: ['', [Validators.required, Validators.minLength(4)]],
      employeeCity: ['', [Validators.required]],
      employeeTelephone: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

  }

  create(data: FormGroup): void {
    if (this.employeeform.valid) {
      if (this.employeeform.valid) {
        const formValues: EmployeeI = {
          employeeName: this.employeeform.get('employeeName')?.value || null,
          lastName1: this.employeeform.get('employeeLastName1')?.value || null,
          lastName2: this.employeeform.get('employeeLastName2')?.value || null,
          cedula: this.employeeform.get('employeeCedula')?.value || null,
          address: this.employeeform.get('employeeAddress')?.value || null,
          city: this.employeeform.get('employeeCity')?.value || null,
          telephone: this.employeeform.get('employeeTelephone')?.value || null
        };
        /*console.log("forms: " +formValues.employeeName);
        console.log("forms: " +formValues.lastName1);
        console.log("forms: " +formValues.lastName2);
        console.log("forms: " +formValues.cedula);
        console.log("forms: " +formValues.address);
        console.log("forms: " +formValues.city);
        console.log("forms: " +formValues.telephone);*/
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

  /*create(data: FormGroup): void {
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
       /*   .subscribe(
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
  }*/
}
