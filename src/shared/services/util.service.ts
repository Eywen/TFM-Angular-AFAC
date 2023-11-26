import {Injectable} from "@angular/core";
import {FieldError} from "../model/FieldError.interface";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public delaytime(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getValidationEmployeeFormErrorMessagge(elem: FieldError, mesagge: string) {
    let errorValidation = '';
    if (elem.errorCode === 'minlength') {
      errorValidation = 'tamaño minimo no superado';
    } else if (elem.errorCode === 'required') {
      errorValidation = 'Dato requerido';
    }

     return mesagge + elem.fieldName + ": " + errorValidation + ". ";
  }
}
