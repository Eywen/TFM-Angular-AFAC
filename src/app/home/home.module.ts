import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*import {SharedModule} from '@shared/shared.module';
import { CpanelModule } from './cpanel/cpanel.module';
import { HomeRoutingModule } from './home-routing.module';*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import {NavbarComponent} from "../navbar/navbar.component";
import {HomeRoutingModule} from "./home-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
import {LoginComponent} from "../login/login.component";
import {AlertComponent} from "../alert/alert.component";
import {Employee_listComponent} from "../employee/employee-list/employee_list.component";
/*import { AboutComponent } from './about/about.component';
import { AlertComponent } from './alert/alert.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RetailComponent } from './retail/retail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CpanelComponent } from './cpanel/cpanel.component';*/

@NgModule({
  declarations: [
    HomeComponent,
    /*AboutComponent,
    AlertComponent,
    ContactComponent,*/
    NavbarComponent,
    EmployeeAddComponent,
    LoginComponent,
    AlertComponent,
    Employee_listComponent
    /*RetailComponent,
    RegisterComponent,
    LoginComponent,
    CpanelComponent*/
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    //SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    //CpanelModule,
  ],
  exports: [

  ]
})
export class HomeModule { }
