import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from "../login/login.component";
import {CustomerAddComponent} from "../customer/customer-add/customer-add.component";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
import {Employee_listComponent} from "../employee/employee-list/employee_list.component";
//import {AboutComponent} from "./about/about.component";
//import {RetailComponent} from './retail/retail.component';
//import {ContactComponent} from './contact/contact.component';
//import {RegisterComponent} from './register/register.component';

//import {CpanelModule} from './cpanel/cpanel.module';

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
