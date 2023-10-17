import { Component } from '@angular/core';
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {EmployeeService} from "../../../shared/services/elements/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee_list.component.html',
  styleUrls: ['./employee_list.component.css']
})
export class Employee_listComponent {

  //employees: EmployeeI[];
  employees: Array<EmployeeI>;
  page = 0;
  size = 10;
  order = "lastName1";
  acs = true;

  constructor(private employeeService: EmployeeService){  }

  ngOnInit(){
    this.getEmployeeList();
  }

  getEmployeeList(){
    this.employeeService.getEmployeeListPage(this.page,this.size,this.order,this.acs).subscribe(data => {
      debugger;
      // @ts-ignore
      this.employees = data.content;
      }
    )
  }
}
