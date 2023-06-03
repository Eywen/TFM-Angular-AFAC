import { Component, Directive, HostListener, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,Validators} from '@angular/forms';
import {CustomerI} from "../../shared/model/customer.interface";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  loginform: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones.
    }

    console.log("Los dos campos son obligatorios", "F.E.N.W.")
  }


}
