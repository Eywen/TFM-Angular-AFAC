import { Component } from '@angular/core';
import {GuideI} from "../../../shared/model/guide.interface";
import {EmployeeI} from "../../../shared/model/Employee.interface";
import {CustomerI} from "../../../shared/model/customer.interface";
import {CityI} from "../../../shared/model/city.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuideService} from "../../../shared/services/elements/guide.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CiudadService} from "../../../shared/services/elements/ciudad.service";
import {AlertService} from "../../../shared/services/alert-service.service";
import {EmployeeService} from "../../../shared/services/elements/employee.service";
import {CustomerService} from "../../../shared/services/elements/customer.service";
import {UtilService} from "../../../shared/services/util.service";
import {formatDate} from "@angular/common";
import {SessionService} from "../../../shared/services/session/session.service";

@Component({
  selector: 'app-guide-add',
  templateUrl: './guide-add.component.html',
  styleUrls: ['./guide-add.component.css']
})
export class GuideAddComponent {

  guide: GuideI;
  employees: EmployeeI[];
  customers: CustomerI[];
  cities:  CityI[];
  guideform: FormGroup;
  succesMsg: string = "";
  states: string[];

  constructor(private formBuilder: FormBuilder, private guideService: GuideService,
              private ciudadService : CiudadService, private alertService : AlertService,
              private employeeService: EmployeeService, private customerService: CustomerService,
              private utilService: UtilService,private router: Router,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.ciudadService.getCitiesList().subscribe(data => {
        this.cities = data;
      }
    );

    this.employeeService.getActivateEmployee().subscribe(data => {
      this.employees = data;
    });

    this.customerService.getCustomersActivate(true).subscribe(data => {
      this.customers = data;
    });

    this.guideService.getStates().subscribe(data => {
      this.states = data
    });

    this.doFormBuilder();
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

  create(data: FormGroup): void {
   if (this.guideform.valid) {
     this.setGuideI();
     this.guideService
       .createGuide(this.guide)
       .subscribe(
         () => {
           //this.iscreateEmployee = true;
           this.succesMsg = this.guide + ' Creado correctamente';

           (async () => {
             // Do something before delay
             //this.employeeService.showMessageSuccess(this.succesMsg ,2000);
             this.alertService.success("Guia Creada");

             //wait time 3 s
             await this.utilService.delaytime(3000);


             // Do something after
             this.router.navigate(['../../../home_guide']);
           })();
         }
       );
   }

  }

  private setGuideI() {
    this.guide = {
      idGuide : this.guideform.get('idGuide')?.value || null,
      recipient : this.guideform.get('recipient')?.value || null,
      address : this.guideform.get('address')?.value || null,
      city : this.guideform.get('city')?.value || null,
      telephone : this.guideform.get('telephone')?.value || null,
      status : this.guideform.get('status')?.value || null,
      entryDate : this.guideform.get('entryDate')?.value || null,
      deliveryDate : this.guideform.get('deliveryDate')?.value || null,
      assignmentDate : this.guideform.get('assignmentDate')?.value || null,
      activate : this.guideform.get('activate')?.value || null,
      employee : this.guideform.get('employee')?.value || null,
      customer : this.guideform.get('customer')?.value || null,
      formatEntryDate : formatDate(  this.guideform.get('entryDate')?.value ,'yyyy-MM-dd', 'en-US') ,
      formatassignmentDate : formatDate(  this.guideform.get('assignmentDate')?.value ,'yyyy-MM-dd', 'en-US') ,
      formatDeliveryDate : formatDate(  this.guideform.get('deliveryDate')?.value ,'yyyy-MM-dd', 'en-US')
    };
  }

  isAuthenticated() {
    return this.sessionService.isAuthenticated();
  }
}
