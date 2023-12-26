import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

export interface FieldError {
  formGroupName: string;
  fieldName: string;
  errorCode: string;
}

export function getFormErrors(
  control: AbstractControl,
  formGroupName: string,
  fieldName: string,
  errors: FieldError[]) {

  if (control instanceof FormGroup) {
    Object.keys(control.controls).forEach(controlName => {
      let formControl = control.get(controlName);
      if (formControl) {
        let fGroupName = formGroupName + "-" + controlName;
        getFormErrors(formControl, fGroupName, controlName, errors);
      }
    })
  }

  if (control instanceof FormArray) {
    control.controls.forEach((fControl: AbstractControl, index) => {
      let fGroupName = formGroupName + "-" + index;
      getFormErrors(fControl, fGroupName, "Array", errors);
    })
  }

  if (control instanceof FormControl) {
    const controlErrors: ValidationErrors | null = control.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(errorCode => {
        errors.push({
          formGroupName: formGroupName,
          fieldName: fieldName,
          errorCode: errorCode
        })
      });
    }
  }
}
