import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from "../login/login.component";
import {CustomerAddComponent} from "../customer-add/customer-add.component";
import {Employee_listComponent} from "../employee/employee-list/employee_list.component";
import {EmployeeAdd_oldComponent} from "../employee/employee-add/employee-add_old.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'addCustomer', component: CustomerAddComponent },
      //{path: 'addEmployee', component: EmployeeAdd_oldComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfacRoutingModule { }
