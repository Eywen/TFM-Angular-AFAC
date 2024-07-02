import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerAddComponent} from "./customer/customer-add/customer-add.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {Employee_listComponent} from "./employee/employee-list/employee_list.component";
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";
import {GuideHomeComponent} from "./guide/guide-home/guide-home.component";
import {EmployeeAddComponent} from "./employee/employee-add/employee-add.component";
import {EmployeeDetailComponent} from "./employee/employee-detail/employee-detail.component";
import {EmployeeUpdateComponent} from "./employee/employee-update/employee-update.component";
import {CustomerDetailComponent} from "./customer/customer-detail/customer-detail.component";
import {CustomerUpdateComponent} from "./customer/customer-update/customer-update.component";
import {GuideAddComponent} from "./guide/guide-add/guide-add.component";
import {GuideUpdateComponent} from "./guide/guide-update/guide-update.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'afac'},
  {path: '', component: HomeComponent},
  {path: 'employee_list', component: Employee_listComponent },
  {path: 'addEmployee', component: EmployeeAddComponent },
  {path: 'detailEmployee/:id', component: EmployeeDetailComponent },
  {path: 'updateEmployee/:id', component:  EmployeeUpdateComponent},
  {path: 'addCustomer', component: CustomerAddComponent },
  {path: 'customer_list', component: CustomerListComponent },
  {path: 'detailCustomer/:id', component: CustomerDetailComponent },
  {path: 'updateCustomer/:id', component: CustomerUpdateComponent },
  {path: 'home_guide', component: GuideHomeComponent },
  {path: 'addGuide', component: GuideAddComponent },
  {path: 'updateGuide/:idguide', component: GuideUpdateComponent, },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export  const routingComponents = [

]
