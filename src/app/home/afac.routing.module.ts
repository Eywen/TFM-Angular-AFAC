import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from "../login/login.component";
import {CustomerAddComponent} from "../customer/customer-add/customer-add.component";
import {Employee_listComponent} from "../employee/employee-list/employee_list.component";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
import {EmployeeDetailComponent} from "../employee/employee-detail/employee-detail.component";
import {EmployeeUpdateComponent} from "../employee/employee-update/employee-update.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'addCustomer', component: CustomerAddComponent },
      {path: 'addEmployee', component: EmployeeAddComponent },
      {path: 'detailEmployee/:id', component: EmployeeDetailComponent },
      {path: 'updateEmployee/:id', component:  EmployeeUpdateComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfacRoutingModule { }
