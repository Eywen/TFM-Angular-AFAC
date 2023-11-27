import { Component, Directive, HostListener, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,Validators} from '@angular/forms';
import {CustomerI} from "../../../shared/model/customer.interface";
import {ApiService} from '../../../shared/services/api.service';
import { HttpResponse } from '@angular/common/http';
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {CiudadService} from "../../../shared/services/elements/ciudad.service";
import {Router} from "@angular/router";
import {UtilService} from "../../../shared/services/util.service";
import {AlertService} from "../../../shared/services/alert-service.service";
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {CustomerService} from "../../../shared/services/elements/customer.service";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent {
////////////////////////////
  loginform: FormGroup;
  errorMsg:any = "inicio";
  creationCustomerOK:boolean = false;
  customerCreate:boolean = false;
  //employee: CustomerI | null = null;
  ///////////////////////////////////////////

  customerform: FormGroup;
  succesMsg = "inicio";
  iserrorMsg:boolean;
  iscreateEmployee:boolean;
  customer: CustomerI ;

  //////////////////////////////////////////////
  //constructor(private formBuilder: FormBuilder,private api:ApiService) {
    //this.prueba();

    /*this.loginform = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      lastName1: ['', [Validators.required, Validators.minLength(4)]],
      lastName2: [''],
      cedula: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      telephone: ['', [Validators.required, Validators.minLength(4)]]
    });*/
  //}
 ////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder,private api:ApiService,private customerService: CustomerService,
              private router: Router, private utilService: UtilService, private alertService: AlertService) {

    this.iserrorMsg = false;
    this.iscreateEmployee = false;

    this.customerform = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerAddress: ['', [Validators.required, Validators.minLength(4)]],
      customerCity: ['', [Validators.required]],
      customerTelephone: ['', [Validators.required, Validators.minLength(4)]],
      customerCloseMonthDay: ['', ]
    });
  }

  create(data: FormGroup): void {
    debugger;
    if (this.customerform.valid) {
      if (this.customerform.valid) {
        const formValues: CustomerI = {
          id: 0,
          customerName: this.customerform.get('customerName')?.value || null,
          address: this.customerform.get('customerAddress')?.value || null,
          city: this.customerform.get('customerCity')?.value || null,
          telephone: this.customerform.get('customerTelephone')?.value || null,
          closeMonthDay: this.customerform.get('customerCloseMonthDay')?.value || null
        };
        this.customerService
          .createCustomer(formValues)
          .subscribe(
            () => {
              //this.iscreateEmployee = true;
              this.succesMsg = formValues.customerName + ' Creado correctamente';

              (async () => {
                // Do something before delay
                //this.employeeService.showMessageSuccess(this.succesMsg ,2000);
                this.alertService.success("Empleado Creado");

                //wait time 3 s
                await this.utilService.delaytime(3000);


                // Do something after
                this.router.navigate(['../../../customer_list']);
              })();
            }
          );
      }
    }
  }

/////////////////////////////////////////////////////////
  /*ngOnInit() {

  }*/
  //sendit(data: FormGroup){
    /*if (this.loginform.valid) {
      // @ts-ignore
      /*const formValues: CustomerI = {
       /* employeeName: this.loginform.get('customerName')?.value || null,
        lastName1: this.loginform.get('lastName1')?.value || null,
        lastName2: this.loginform.get('lastName2')?.value || null,
        cedula: this.loginform.get('cedula')?.value || null,
        address: this.loginform.get('address')?.value || null,
        city: this.loginform.get('city')?.value || null,
        telephone: this.loginform.get('telephone')?.value || null*/
      /*};*/

      // Aquí puedes hacer lo que necesites con el objeto formValues, como enviarlo a través de una API, procesarlo, etc.
      /*console.log("forValues: "+formValues);*/

      /*this.api.addCustomer(formValues).subscribe(data => {
      //this.api.getPreuba().subscribe(data => {
        console.log("data: "+data);
        this.errorMsg = "datosr respuesta api get "
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
      })*/
   /* } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones.
      this.errorMsg = "Los dos campos son obligatorios\"";
      console.log("FORMULARIO NMO VALIDO: "+this.errorMsg);
    }*/

    //console.log("fin llamada api Los dos campos son obligatorios", "F.E.N.W.")
  /*}*/

  //prueba(){
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
