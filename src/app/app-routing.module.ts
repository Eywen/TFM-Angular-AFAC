import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerAddComponent} from "./customer-add/customer-add.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
//import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
 /* {path: 'addCustomer', component: CustomerAddComponent },
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent },*/
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)}, // lazy load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export  const routingComponents = [
  //CustomerAddComponent,
  //LoginComponent,
  //HomeComponent
  ]
