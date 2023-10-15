import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import {NavbarComponent} from "../navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
import {LoginComponent} from "../login/login.component";
import {AlertComponent} from "../alert/alert.component";
import {Employee_listComponent} from "../employee/employee-list/employee_list.component";
import {AfacRoutingModule} from "./afac.routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    EmployeeAddComponent,
    LoginComponent,
    //AlertComponent,
    Employee_listComponent
  ],
  imports: [
    CommonModule,
    AfacRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [

  ]
})
export class HomeModule { }
