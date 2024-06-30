import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';

import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CoreModule} from "./core/core.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {AlertComponent} from "./alert/alert.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { GuideHomeComponent } from './guide/guide-home/guide-home.component';
import { GuideUpdateComponent } from './guide/guide-update/guide-update.component';
import { GuideAddComponent } from './guide/guide-add/guide-add.component';
import {LoginComponent} from "./login/login.component";
import {EmployeeAddComponent} from "./employee/employee-add/employee-add.component";
import {Employee_listComponent} from "./employee/employee-list/employee_list.component";

@NgModule({
  declarations: [
    AppComponent,
    CustomerAddComponent,
    NavbarComponent,
    AlertComponent,
    Employee_listComponent,
    EmployeeAddComponent,
    EmployeeDetailComponent,
    EmployeeUpdateComponent,
    GuideHomeComponent,
    //CustomerListComponent,
    //--------------
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
