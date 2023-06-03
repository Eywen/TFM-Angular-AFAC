import { Component, Directive, HostListener, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,Validators} from '@angular/forms';
import {CustomerI} from "../../shared/model/customer.interface";
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  loginform: FormGroup;
  errorMsg:any = "";
  creationCustomerOK:boolean = false;
  customerCreate:boolean = false;
  constructor(private formBuilder: FormBuilder,private api:ApiService) {
    this.loginform = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      lastName1: ['', [Validators.required, Validators.minLength(4)]],
      lastName2: [''],
      cedula: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      telephone: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

  }
  sendit(data: FormGroup){
    if (this.loginform.valid) {
      const formValues: CustomerI = {
        customerName: this.loginform.get('customerName')?.value || null,
        lastName1: this.loginform.get('lastName1')?.value || null,
        lastName2: this.loginform.get('lastName2')?.value || null,
        cedula: this.loginform.get('cedula')?.value || null,
        address: this.loginform.get('address')?.value || null,
        telephone: this.loginform.get('telephone')?.value || null
      };

      // Aquí puedes hacer lo que necesites con el objeto formValues, como enviarlo a través de una API, procesarlo, etc.
      console.log(formValues);

      this.api.addCustomer(formValues).subscribe(data => {
        console.log(data);
        if (data.status == 201) {
          this.creationCustomerOK = true;
          this.errorMsg = "Empleado creado correctamente."
        }
      }, error => {
        this.customerCreate = true;
        console.log(error);
        if (error.status == 400) {
          this.errorMsg = "Error. Hacen falta campos obligatorios";
        } else if (error.status == 409) {
          this.errorMsg = "Error. El empleado ya existe";
        } else {
          this.errorMsg = "Error en cración de empleado. Contacte con el administrador del sistema";
        }
      })
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones.
      this.errorMsg = "Los dos campos son obligatorios\"";
    }

    console.log("Los dos campos son obligatorios", "F.E.N.W.")
  }


}
