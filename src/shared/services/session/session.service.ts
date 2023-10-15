import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {Session} from "../../../app/classes/core/Session";

import {JwtHelperService} from '@auth0/angular-jwt';
import {map, Observable} from "rxjs";
import {Role} from "../../model/enums/Role";
import {CONFIG} from "../../../app/config";
import {environment} from "../../../environments/environment";
//import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //static END_POINT = environment.REST_BACKEND + '/users/token';
  static END_POINT = 'http://localhost:8080' + '/users/token';
  private session: Session | null;

  constructor(private api: ApiService, private router: Router) {
    this.session = this.getLocalSession();
  }

  public getsession(): Session {
    if (this.session === null) {
      //throw new Error("La sesión no está definida");
      // retornar un valor predeterminado en lugar de lanzar una excepción
      return { token: '', name: '', role: undefined };
    }
    return this.session;
  }

  validateCredentials(username: string, password: string): Observable<any> {
    return this.api.authBasic(username, password)
      .post(SessionService.END_POINT)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          return {
            token: jsonToken.token,
            name: jwtHelper.decodeToken(jsonToken.token).name,
            role: jwtHelper.decodeToken(jsonToken.token).role
          }
        })
      );
  }

  logout(): void {
    this.destroySession();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    var b = this.session != null && !(new JwtHelperService().isTokenExpired(this.session.token));
    return this.session != null && !(new JwtHelperService().isTokenExpired(this.session.token));
  }

  hasRoles(roles: Role[]): boolean {
    //return this.isAuthenticated() && roles.includes(this.session.role);
    return this.isAuthenticated() && this.session !== null && roles.includes(<Role>this.session.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  untilManager(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER]);
  }

  untilOperator(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER, Role.OPERATOR]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }

  /*getMobile(): number {
    return this.session ? this.session.mobile : undefined;
  }*/

  getName(): string | undefined {
    return this.session ? this.session.name : '???';
  }

  getToken(): string | undefined {
    return this.session ? this.session.token : undefined;
  }

  public createSession(token: string, name: string, email: string, role: Role): Observable<any> {

    return new Observable(observer => {
      this.destroySession();
      this.session = {
        token: token,
        name: name,
        role: role
      };

      localStorage.setItem(`${CONFIG.STORAGE.SESSION}`, JSON.stringify(this.session));
      observer.complete();
    });
  }

  private getLocalSession() {
    //return JSON.parse(localStorage.getItem(`${CONFIG.STORAGE.SESSION}`));
    const session = localStorage.getItem(`${CONFIG.STORAGE.SESSION}`);
    return session ? JSON.parse(session) : null;
  }

  public destroySession() {
    this.session = null;
    localStorage.removeItem(`${CONFIG.STORAGE.SESSION}`);
  }
}
