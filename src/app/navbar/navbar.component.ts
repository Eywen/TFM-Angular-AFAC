import {Component, Input} from '@angular/core';
import {SessionService} from "../../shared/services/session/session.service";
//import {SessionService} from "@services/session/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showLogin:boolean = false;

  constructor(private sessionService: SessionService, private router: Router) {}
  isAuthenticated(): boolean {
    this.showLogin= this.sessionService.isAuthenticated();
    console.log("autenticado: " +this.showLogin);
    debugger;
    return this.showLogin;
  }

  logout(): void {
    this.sessionService.destroySession();
    this.router.navigate(['/afac/login']);
  }

  goLogin()  {
    this.router.navigate(['/afac/login']);
  }
}
