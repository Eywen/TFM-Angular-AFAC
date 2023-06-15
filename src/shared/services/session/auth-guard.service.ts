import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';


import {SessionService} from "./session.service";
import {Role} from "../../model/enums/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: SessionService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles: Role[] = route.data['roles'];
    if (this.auth.hasRoles(roles)) {
      return true;
    } else {
      this.router.navigate(['']).then();
      return false;
    }
  }
}
