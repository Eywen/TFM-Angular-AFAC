import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";

//import {EmployeeI} from "../model/customer.interface";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {CredentialI} from "../model/credential.interface";
import {catchError, EMPTY, map, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseurl = "http://localhost:8080";

  static CONNECTION_REFUSE = 0;
  static UNAUTHORIZED = 401;

  // @ts-ignore
  private headers: HttpHeaders;
  // @ts-ignore
  private params: HttpParams;
  // @ts-ignore
  private responseType: string;
  private successfulNotification = undefined;
  private errorNotification = undefined;

  constructor(private http: HttpClient,/*private snackBar: MatSnackBar,*/private router: Router) {
    this.resetOptions();/*
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';*/
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  getToken(){
    return localStorage.getItem('token');
  }



  /*post(endpoint: string, body?: object): Observable<any> {
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }*/

  authBasic(username: string, password: string): ApiService {
    return this.header('Authorization', 'Basic ' + btoa(username + ':' + password));
  }

  header(key: string, value: string): ApiService {
    if (value != null) {
      this.headers = this.headers.append(key, value); // This class is immutable
    }
    return this;
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    debugger;
    this.resetOptions();
    return options;
  }

  post(endpoint: string, body?: object): Observable<any> {
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => (response: HttpResponse<any>) => {
            const  body = response.body;
            debugger;
            return body;
          }
        //catchError(error => this.handleError(error))
          //.pipe(map((response: HttpResponse<any>) => {
      ));
  }

  // @ts-ignore
  /*private extractData(response): any {
    if (this.successfulNotification) {
      /*this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });*/
     /* this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        window.open(window.URL.createObjectURL(blob));
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else {
      return response;
    }
  }*/

  private showError(notification: string): void {
    if (this.errorNotification) {
      //this.snackBar.open(this.errorNotification, 'Error', {duration: 5000});
      this.errorNotification = undefined;
    } else {
      //this.snackBar.open(notification, 'Error', {duration: 5000});
    }
  }

  // @ts-ignore
  private handleError(response): any {
    let error: Error;
    if (response.status === ApiService.UNAUTHORIZED) {
      this.showError('Unauthorized');
      this.router.navigate(['']).then();
      return EMPTY;
    } else if (response.status === ApiService.CONNECTION_REFUSE) {
      this.showError('Connection Refuse');
      return EMPTY;
    } else {
      try {
        error = response.error; // with 'text': JSON.parse(response.error);
        this.showError(error.message + ' (' + response.status + '): ' + error.message);
        return throwError(() => error);
      } catch (e) {
        this.showError('Not response');
        return throwError(() => response.error);
      }
    }
  }



  /* login(cred: CredentialI){
    let direccion = this.baseurl + "/login";
    return this.http.post(direccion,cred,{
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
        const  body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');

        localStorage.setItem('token', token);

        return body;
        }
      )
    )
  }*/
}
