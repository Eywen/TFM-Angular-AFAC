import { Component, Directive, HostListener, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,Validators} from '@angular/forms';
import {CustomerI} from "../../../shared/model/customer.interface";
import {ApiService} from '../../../shared/services/api.service';
import {Router} from "@angular/router";
import {UtilService} from "../../../shared/services/util.service";
import {AlertService} from "../../../shared/services/alert-service.service";
import {CustomerService} from "../../../shared/services/elements/customer.service";
import {SessionService} from "../../../shared/services/session/session.service";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent {

  loginform: FormGroup;
  errorMsg:any = "inicio";
  creationCustomerOK:boolean = false;
  customerCreate:boolean = false;

  customerform: FormGroup;
  succesMsg = "inicio";
  iserrorMsg:boolean;
  iscreateEmployee:boolean;
  customer: CustomerI ;

  constructor(private formBuilder: FormBuilder,private api:ApiService,private customerService: CustomerService,
              private router: Router, private utilService: UtilService, private alertService: AlertService,
              private sessionService: SessionService) {

    this.iserrorMsg = false;
    this.iscreateEmployee = false;

    this.customerform = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerAddress: ['', [Validators.required, Validators.minLength(4)]],
      customerCity: [''],
      customerTelephone: ['', [Validators.required, Validators.minLength(4)]],
      customerCloseMonthDay: ['']
    });
  }

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
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
                this.alertService.success("Cliente Creado");
                //wait time 3 s
                await this.utilService.delaytime(3000);
                // Do something after
                this.router.navigate(['../../customer_list']);
              })();
            }
          );
      }
    }
  }
}
