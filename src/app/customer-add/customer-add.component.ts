import { Component, Directive, HostListener, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerI} from "../../shared/model/customer.interface";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  loginform = new FormGroup({
    customerName: new FormControl('',
      [Validators.required, Validators.minLength(2)]),
    lastName1: new FormControl('',
      [Validators.required, Validators.minLength(4)]),
    lastName2: new FormControl(),
    address: new FormControl('',
      [Validators.required, Validators.minLength(4)]),
    cedula: new FormControl('',
      [Validators.required, Validators.minLength(4)]),
    telephone: new FormControl('',
      [Validators.required, Validators.minLength(4)])
  });

  sendit(data: FormGroup){
    /*if (data.get('customerName').hasError('required') ||
      data.get('lastName1').hasError('required') )*/
        console.log("Los dos campos son obligatorios", "F.E.N.W.")
  }

  constructor() { }

  ngOnInit() {
  }

}
