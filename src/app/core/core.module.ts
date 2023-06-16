import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SessionService} from "../../shared/services/session/session.service";
import {ApiService} from "../../shared/services/api.service";
import {AuthGuardService} from "../../shared/services/session/auth-guard.service";
import {TokenInterceptor} from "./tokeninterceptor";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SessionService,
   ApiService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
}
