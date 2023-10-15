import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from "../login/login.component";
import {CustomerAddComponent} from "../customer-add/customer-add.component";
import {Employee_listComponent} from "../employee/employee-list/employee_list.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'employee_list', component: Employee_listComponent },
      {path: 'addCustomer', component: CustomerAddComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfacRoutingModule { }
