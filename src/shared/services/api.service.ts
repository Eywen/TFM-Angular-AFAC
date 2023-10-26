import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";

import {CustomerI} from "../model/customer.interface";
//import {EmployeeI} from "../model/customer.interface";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule} from '@angular/material/snack-bar';
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
  static CONFLICT = 409;

  // @ts-ignore
  private headers: HttpHeaders;
  // @ts-ignore
  private params: HttpParams;
  // @ts-ignore
  private responseType: string;
  private successfulNotification = undefined;
  private errorNotification = undefined;
  private horizontalPosition: MatSnackBarHorizontalPosition = "center";
  private duration: number =  5000;

  constructor(private http: HttpClient,private snackBar: MatSnackBar,private router: Router) {
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

  addCustomer(form:CustomerI):Observable<HttpResponse<Object>>{
    let direccion = this.baseurl + "/customers";
    return this.http.post(direccion,form,{observe: 'response'});}

  authBasic(username: string, password: string): ApiService {
    debugger;
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
    this.resetOptions();
    return options;
  }

  post(endpoint: string, body?: object): Observable<any> {
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  // @ts-ignore
  private extractData(response): any {
    debugger;
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
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
  }

  public showError(notification: string, duration: number): void {
    if (this.errorNotification) {
      this.snackBar.open(this.errorNotification, 'Error', {duration: duration});
      this.errorNotification = undefined;
    } else {
      this.snackBar.open(notification, 'Error', { horizontalPosition: this.horizontalPosition, duration: duration,  panelClass: ['error-snackbar']});
    }
  }

  // @ts-ignore
  private handleError(response): any {
    debugger;
    let error: Error;
    if (response.status === ApiService.UNAUTHORIZED) {
      this.showError('Unauthorized', this.duration);
      this.router.navigate(['']).then();
      return EMPTY;
    } else if (response.status === ApiService.CONNECTION_REFUSE) {
      this.showError('Connection Refuse',this.duration);
      return EMPTY;
    } else if (response.status === ApiService.CONFLICT){
      return throwError(() => response);
    } else {
      try {
        error = response.error; // with 'text': JSON.parse(response.error);
        this.showError(error.message + ' (' + response.status + '): ' + error.message,this.duration);
        return throwError(() => error);
      } catch (e) {
        this.showError('Not response',this.duration);
        return throwError(() => response.error);
      }
    }
  }

  successful(notification = 'Successful'): ApiService{
    // @ts-ignore
    this.successfulNotification = notification;
    return this;
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
  get(listUrl: string) {
    debugger;
    return this.http
      .get(listUrl, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  put(endpoint: string, body?: object): Observable<any> {
    console.log(" url update: " + endpoint);
    return this.http
      .put(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

 /* post(endpoint: string, body?: object): Observable<any> {
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => (response: HttpResponse<any>) => {
            const  body = response.body;
            debugger;
            return body;
          },
          catchError(error => {
            console.log("error: " +error.getSortStatusMessageBySortValue);
            if (error.status === 409) {
              // Manejo específico para el estado 409
              const errorMessage = 'Error: El empleado ya existe';
              // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de error en el componente
              //return throwError(errorMessage);
            }
            // Si no es un error 409, propagar el error original
            return throwError(error);
          })
          //catchError(error => this.handleError(error))
          //.pipe(map((response: HttpResponse<any>) => {
        ))
      ;
  }*/

  /*post(endpoint: string, body?: object): Observable<any> {
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }*/
}
