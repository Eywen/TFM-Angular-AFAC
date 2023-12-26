import { Component } from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {

  id:number;
  employeeDetail: EmployeeI;

  constructor(private api:ApiService,private employeeService: EmployeeService,private route: ActivatedRoute) {
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("param id: " + this.id);
      this.employeeService
        .findEmployeeById(this.id).subscribe(data => {
        this.employeeDetail = data;
      });

    });
  }

}
