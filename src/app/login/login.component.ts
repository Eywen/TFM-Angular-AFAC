import { Component } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {NgForm} from "@angular/forms";
import {CredentialI} from "../../shared/model/credential.interface";
import {Router} from "@angular/router";
import {Credentials} from "../../shared/model/Credentials";
import {SessionService} from "../../shared/services/session/session.service";
import {AlertService} from "../../shared/services/alert-service.service";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {UtilService} from "../../shared/services/util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // @ts-ignore
  public credentials: Credentials;



  cred: CredentialI = {
    user: '',
    password: ''
  };

  constructor(private api:ApiService,private sessionService: SessionService,
              private router: Router, private alertService: AlertService,
              private utilService: UtilService) {  }

  ngOnInit() {
    this.credentials = new Credentials();
  }

  public login(): void {
    debugger;
    this.sessionService.validateCredentials(this.credentials.username,this.credentials.password)
      .subscribe({
        next: results => {
          this.handleLoginResult(results)
        },
        error: err => {
          this.alertService.error(err.message);
        }
      });
  }

  private handleLoginResult(results: any) {
    this.sessionService.createSession(results.token, results.name, results.email, results.role)
      .subscribe();
    //this.router.navigate(['/home/cpanel']);
    (async () => {
      // Do something before delay
      //this.employeeService.showMessageSuccess(this.succesMsg ,2000);
      this.alertService.success('Identificación correcta');

      //wait time 3 s
      await this.utilService.delaytime(3000);


      // Do something after
      this.router.navigate(['home']);
    })();


  }

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }

  logout(): void {
    this.sessionService.destroySession();
    this.router.navigate(['/home/login']);
  }

}
