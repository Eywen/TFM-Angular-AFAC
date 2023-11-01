import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerI} from "../../../shared/model/customer.interface";
import {ApiService} from "../../../shared/services/api.service";
//import {EmployeeService} from "../../../shared/services/employee.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {CiudadService} from "../../../shared/services/elements/ciudad.service";
import {CityI} from "../../../shared/model/city.interface";
import {Route, Router} from "@angular/router";
import {UtilService} from "../../../shared/services/util.service";

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
  //employee: CustomerI | null = null;
  employee: EmployeeI ;
  cities: CityI[];

  constructor(private formBuilder: FormBuilder,private api:ApiService,private employeeService: EmployeeService,
              private ciudadService : CiudadService, private router: Router, private utilService: UtilService) {

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
    this.ciudadService.getCitiesList().subscribe(data => {
        this.cities = data;
      }
    );
  }

  create(data: FormGroup): void {
    if (this.employeeform.valid) {
      if (this.employeeform.valid) {
        const formValues: EmployeeI = {
          id: "",
          employeeName: this.employeeform.get('employeeName')?.value || null,
          lastName1: this.employeeform.get('employeeLastName1')?.value || null,
          lastName2: this.employeeform.get('employeeLastName2')?.value || null,
          cedula: this.employeeform.get('employeeCedula')?.value || null,
          address: this.employeeform.get('employeeAddress')?.value || null,
          city: this.employeeform.get('employeeCity')?.value || null,
          telephone: this.employeeform.get('employeeTelephone')?.value || null
        };
        this.employeeService
          .createEmployee(formValues)
          .subscribe(
            () => {
              //this.iscreateEmployee = true;
              this.succesMsg = formValues.employeeName + ' Creado correctamente';

              (async () => {
                // Do something before delay
                this.employeeService.showMessageSuccess(this.succesMsg ,2000);

                await this.utilService.delaytime(3000);

                // Do something after
                this.router.navigate(['../../../employee_list']);
              })();


            }/*,
            error => {
              this.iserrorMsg = true;
              this.errorMsg = error;
              /*if (error.status === 409) {
                this.errorMsg = this.existEmployee;
              } else { // Manejo para otros errores
                this.errorMsg = 'Error al crear empleado.';
              }*/
            /*}*/
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
