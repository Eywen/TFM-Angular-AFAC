import { Component } from '@angular/core';
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {EmployeeService} from "../../../shared/services/elements/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee_list.component.html',
  styleUrls: ['./employee_list.component.css']
})
export class Employee_listComponent {

  employees: EmployeeI[];

  constructor(private employeeService: EmployeeService){  }

  ngOnInit(){
    this.getEmployeeList();
  }

  getEmployeeList(){
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
      }
    )
  }
}
