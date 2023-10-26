import { Component } from '@angular/core';
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {ApiService} from "../../../shared/services/api.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FieldError, getFormErrors} from "../../../shared/model/FieldError.interface";

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {

  id:number;
  employeeform: FormGroup;
  employeeDetail: EmployeeI;
  mesagge: string = "";

  constructor(private formBuilder: FormBuilder,private api:ApiService,private employeeService: EmployeeService,private route: ActivatedRoute) {
  }
  ngOnInit(){
    this.doFormBuilder();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("param id: " + this.id);
      this.employeeService
        .findEmployeeById(this.id).subscribe(data => {
        debugger;
        this.employeeDetail = data;
        console.log(this.employeeDetail.cedula);
        console.log("form update valido: " + this.employeeDetail.lastName1);
        this.setFormValues();
      });
    });
  }

  private doFormBuilder() {
    this.employeeform = this.formBuilder.group({
      employeeName: ['', [Validators.required, Validators.minLength(2)]],
      employeeLastName1: ['', [Validators.required, Validators.minLength(4)]],
      employeeLastName2: [''],
      employeeCedula: ['', [Validators.required, Validators.minLength(4)]],
      employeeAddress: ['', [Validators.required, Validators.minLength(4)]],
      employeeCity: ['', [Validators.required]],
      employeeTelephone: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  update(): void {

    console.log("form update valido: " + this.employeeDetail.lastName1);
    this.setFormValues();

    console.log("form update valido: " + this.employeeform.valid);
    if (this.employeeform.valid) {
      this.employeeService.update(this.id,this.employeeDetail).subscribe(
        data => {console.log("update: " + data)}
      );
    } else {
      let errors: FieldError[] = []
      getFormErrors(this.employeeform, "root", "", errors);
      errors.forEach(elem => {
        this.mesagge = this.mesagge + elem.fieldName + ": " + elem.errorCode + ", ";
      });
      this.employeeService.showMessage(this.mesagge,20000);
    }
  }
  private setFormValues() {
    this.employeeform.patchValue({
      employeeName: this.employeeDetail.employeeName,
      employeeLastName1: this.employeeDetail.lastName1,
      employeeLastName2: this.employeeDetail.lastName2,
      employeeCedula: this.employeeDetail.cedula,
      employeeAddress: this.employeeDetail.address,
      employeeCity: this.employeeDetail.city,
      employeeTelephone: this.employeeDetail.telephone
    });
  }

}
