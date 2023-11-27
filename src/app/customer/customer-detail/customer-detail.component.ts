import { Component } from '@angular/core';
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {ApiService} from "../../../shared/services/api.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerI} from "../../../shared/model/customer.interface";
import {CustomerService} from "../../../shared/services/elements/customer.service";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {

  id:number;
  customerDetail: CustomerI;

  constructor(private api:ApiService,private customerService: CustomerService,private route: ActivatedRoute) {
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("param id: " + this.id);
      this.customerService
        .findCustomerById(this.id).subscribe(data => {
          debugger;
        this.customerDetail = data;
      });

    });
  }

}
