import { Component } from '@angular/core';
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {ApiService} from "../../../shared/services/api.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FieldError, getFormErrors} from "../../../shared/model/FieldError.interface";
import {CiudadService} from "../../../shared/services/elements/ciudad.service";
import {CityI} from "../../../shared/model/city.interface";
import {AlertService} from "../../../shared/services/alert-service.service";
import {UtilService} from "../../../shared/services/util.service";

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
  cities: CityI[];
  modalDisableTitle: string;
  selectedEmployeeId: number;
  selectedEmployeeName: string;
  private errorValidation: string;


  constructor(private formBuilder: FormBuilder,private api:ApiService,private employeeService: EmployeeService,
              private ciudadService : CiudadService,private route: ActivatedRoute,
              private alertService: AlertService, private utilService: UtilService ) {
  }
  ngOnInit(){
  this.ciudadService.getCitiesList().subscribe(data => {
      this.cities = data;
      console.log("city: " + this.cities[0]);
    }
  );
    this.doFormBuilder();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.employeeService
        .findEmployeeById(this.id).subscribe(data => {
        this.employeeDetail = data;
        /*console.log(this.employeeDetail.cedula);
        console.log("form update valido: " + this.employeeDetail.lastName1);*/
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
    this.setFormValues();
    if (this.employeeform.valid) {
      this.employeeService.update(this.id,this.employeeDetail).subscribe(
        data => {
          this.alertService.success('Empleado modificado correctamente');
        }
      );
    } else {
      let errors: FieldError[] = []
      getFormErrors(this.employeeform, "root", "", errors);
      errors.forEach(elem => {
        //this.mesagge = this.mesagge + elem.fieldName + ": " + elem.errorCode + ", ";
        this.mesagge = this.utilService.getValidationEmployeeFormErrorMessagge(elem,this.mesagge);
      });
      ///this.employeeService.showMessageError(this.mesagge,20000);
      this.alertService.error(this.mesagge);
      this.ngOnInit();
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

  setSelectedEmployeeId(employee: EmployeeI) {
      this.modalDisableTitle = "Modificar empleado";
      this.selectedEmployeeId = employee.id;
      this.selectedEmployeeName = employee.employeeName + " " + employee.lastName1 + " " + (null != employee.lastName2 ? employee.lastName2 : "");

  }

}
