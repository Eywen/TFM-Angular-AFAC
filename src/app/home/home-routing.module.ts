import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from "../login/login.component";
import {CustomerAddComponent} from "../customer-add/customer-add.component";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
//import {AboutComponent} from "./about/about.component";
//import {RetailComponent} from './retail/retail.component';
//import {ContactComponent} from './contact/contact.component';
//import {RegisterComponent} from './register/register.component';

//import {CpanelModule} from './cpanel/cpanel.module';

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      /*{path: '', component: RetailComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'register', component: RegisterComponent},*/
      {path: 'login', component: LoginComponent},
      //{path: 'addCustomer', component: CustomerAddComponent },
      {path: 'addEmployee', component: EmployeeAddComponent },
      //{path: 'cpanel', loadChildren: () => CpanelModule},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
