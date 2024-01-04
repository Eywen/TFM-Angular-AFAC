import {Injectable} from "@angular/core";
import {FieldError} from "../model/FieldError.interface";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private showHome: boolean = true;
  private showLogin: boolean = true;
  public delaytime(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getValidationFormErrorMessagge(elem: FieldError, mesagge: string) {
    let errorValidation = '';
    if (elem.errorCode === 'minlength') {
      errorValidation = 'tamaño minimo no superado';
    } else if (elem.errorCode === 'required') {
      errorValidation = 'Dato requerido';
    }

     return mesagge + elem.fieldName + ": " + errorValidation + ". ";
  }

  isShowHome() : boolean {
    return this.showHome;
  }

  setShowHome(show: boolean){
    this.showHome = show;
  }

  isShowLogin(): boolean{
    return this.showLogin;
  }

  setShowLogin(show: boolean){
    this.showHome = show;
  }
}
