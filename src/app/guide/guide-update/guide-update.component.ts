import { Component } from '@angular/core';
import {formatDate} from "@angular/common";
import {GuideService} from "../../../shared/services/elements/guide.service";
import {ActivatedRoute} from "@angular/router";
import {GuideI} from "../../../shared/model/guide.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityI} from "../../../shared/model/city.interface";
import {CiudadService} from "../../../shared/services/elements/ciudad.service";
import {FieldError, getFormErrors} from "../../../shared/model/FieldError.interface";
import {AlertService} from "../../../shared/services/alert-service.service";
import {UtilService} from "../../../shared/services/util.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {CustomerService} from "../../../shared/services/elements/customer.service";
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {CustomerI} from "../../../shared/model/customer.interface";

@Component({
  selector: 'app-guide-update',
  templateUrl: './guide-update.component.html',
  styleUrls: ['./guide-update.component.css']
})
export class GuideUpdateComponent {

  numGuide:number;
  guideDetail: GuideI;
  guideform: FormGroup;
  cities:  CityI[];
  modalUpdateTitle: string;
  selectedGuideId: number;
  mesagge: string;
  employees: EmployeeI[];
  customers: CustomerI[];
  states: string[];

  constructor(private formBuilder: FormBuilder, private guideService: GuideService, private route: ActivatedRoute,
              private ciudadService : CiudadService, private alertService : AlertService,
              private employeeService: EmployeeService, private customerService: CustomerService,
              private utilService: UtilService) {
  }

  ngOnInit() {

    this.ciudadService.getCitiesList().subscribe(data => {
        this.cities = data;
      }
    );

    this.guideService.getStates().subscribe(data => {
        this.states = data;
      }
    );

    this.employeeService.getActivateEmployee().subscribe(data => {
      this.employees = data;
    });


    this.customerService.getCustomersActivate(true).subscribe(data => {
      this.customers = data;
    });

    this.doFormBuilder();
    this.route.params.subscribe(params => {
      this.numGuide = params['idguide'];
      this.guideService
        .findByGuideId(this.numGuide).subscribe(data => {
        this.guideDetail = data;
        this.generateFormatDate(data);
        this.setFormValues();
      });
    });
  }

  private generateFormatDate(guide: GuideI) {
    this.guideDetail.formatEntryDate = formatDate(guide.entryDate, 'yyyy-MM-dd', 'en-US');
    this.guideDetail.formatassignmentDate = formatDate(guide.assignmentDate, 'yyyy-MM-dd', 'en-US');
    this.guideDetail.formatDeliveryDate = formatDate(guide.deliveryDate, 'yyyy-MM-dd', 'en-US');
  }

  private doFormBuilder() {
    this.guideform = this.formBuilder.group({
      idGuide: ['', [Validators.required]],
      recipient: [''],
      address: [''],
      city: [''],
      telephone: [''],
      status: [''],
      entryDate: [''],
      deliveryDate: [''],
      assignmentDate: [''],
      activate: [''],
      employee: [''],
      customer: [''],
      formatEntryDate: [''],
      formatassignmentDate: [''],
      formatDeliveryDate: ['']
    });
  }

  private setFormValues() {
    this.generateFormatDate(this.guideDetail);
    this.guideform.patchValue({
      idGuide : this.guideDetail.idGuide ,
      recipient : this.guideDetail.recipient ,
      address : this.guideDetail.address ,
      city : this.guideDetail.city ,
      telephone : this.guideDetail.telephone ,
      status : this.guideDetail.status ,
      entryDate : this.guideDetail.entryDate ,
      deliveryDate : this.guideDetail.deliveryDate ,
      assignmentDate : this.guideDetail.assignmentDate ,
      activate : this.guideDetail.activate ,
      employee : this.guideDetail.employee ,
      customer : this.guideDetail.customer ,
      formatEntryDate : this.guideDetail.formatEntryDate ,
      formatassignmentDate : this.guideDetail.formatassignmentDate ,
      formatDeliveryDate : this.guideDetail.formatDeliveryDate
    });
    debugger;
  }

  setSelectedGuideId(guide_detail: GuideI) {
    this.modalUpdateTitle = "Modificar guia";
    this.selectedGuideId = guide_detail.idGuide;
  }

  update() {
    this.setFormValues();
    debugger
    if (this.guideform.valid) {
      this.guideService.update(this.numGuide,this.guideDetail).subscribe(
        data => {
          this.alertService.success('Guia modificada correctamente');
        }
      );
    } else {
      let errors: FieldError[] = []
      getFormErrors(this.guideform, "root", "", errors);
      errors.forEach(elem => {
        //this.mesagge = this.mesagge + elem.fieldName + ": " + elem.errorCode + ", ";
        this.mesagge = this.utilService.getValidationFormErrorMessagge(elem,this.mesagge);
      });
      ///this.guideService.showMessageError(this.mesagge,20000);
      this.alertService.error(this.mesagge);
      this.ngOnInit();
    }
  }
}
