import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerAddComponent} from "./customer-add/customer-add.component";

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path: 'addCustomer', component: CustomerAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export  const routingComponents = [
  CustomerAddComponent
  ]
