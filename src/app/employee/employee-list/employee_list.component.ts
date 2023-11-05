import { Component } from '@angular/core';
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee_list.component.html',
  styleUrls: ['./employee_list.component.css']
})
export class Employee_listComponent {

  employees: Array<EmployeeI>;
  page = 0;
  size = 10;
  order = "employeeName";
  acs = true;
  isFirstPage = false;
  isLastPage = false;
  totalPages: Array<number>;
  selectedEmployeeId: number;
  modalDisableTitle: string;
  selectedEmployeeName: string;

  constructor(private employeeService: EmployeeService, private router: Router){  }

  ngOnInit(){
    this.getEmployeeActivateList();
  }

  getEmployeeList(){
    this.employeeService.getEmployeeListPage(this.page,this.size,this.order,this.acs).subscribe(data => {
      // @ts-ignore
      this.employees = data.content;
      // @ts-ignore
      this.isFirstPage = data.first;
      // @ts-ignore
      this.isLastPage = data.last;
      // @ts-ignore
      this.totalPages = new Array(data['totalPages']);
      }
    )
  }
  getEmployeeActivateList(){
    this.employeeService.getEmployeeActivateListPage(this.page,this.size,this.order,this.acs).subscribe(data => {
      // @ts-ignore
      this.employees = data.content;
      // @ts-ignore
      this.isFirstPage = data.first;
      // @ts-ignore
      this.isLastPage = data.last;
      // @ts-ignore
      this.totalPages = new Array(data['totalPages']);
      }
    )
  }

  sort(order : string) {
    this.acs = !this.acs;
    this.order = order;
    this.getEmployeeList();
  }

  rewind() {
    if (!this.isFirstPage){
      this.page--;
      this.getEmployeeList();
    }
  }
  forward() {
    if (!this.isLastPage){
      this.page++;
      this.getEmployeeList();
    }
  }

  setPage(page: number){
    this.page = page;
    this.getEmployeeList();
  }

  addEmploye() {
    this.router.navigate(['/afac/addEmployee']);
  }


  confirmDisable(employeeId: number) {
      this.employeeService.disable(employeeId).subscribe(() => {
        this.getEmployeeActivateList();
      });
  }

  setSelectedEmployeeId(employee: EmployeeI) {
    this.modalDisableTitle = "Eliminar empleado";
    this.selectedEmployeeId = employee.id;
    this.selectedEmployeeName = employee.employeeName + " " + employee.lastName1 + " " + (null != employee.lastName2 ? employee.lastName2 : "");
  }
}
