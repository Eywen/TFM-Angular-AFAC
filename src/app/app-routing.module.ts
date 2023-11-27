import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerAddComponent} from "./customer/customer-add/customer-add.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {Employee_listComponent} from "./employee/employee-list/employee_list.component";
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";
//import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'afac'},
  {path: 'employee_list', component: Employee_listComponent },
  {path: 'customer_list', component: CustomerListComponent },
  /*{path: 'login', component: LoginComponent },*/
  {path: 'home', component: HomeComponent },
  {path: 'afac', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)}, // lazy load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export  const routingComponents = [

]
