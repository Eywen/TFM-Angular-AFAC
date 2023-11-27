import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityI} from "../../../shared/model/city.interface";
import {ApiService} from "../../../shared/services/api.service";

import {CiudadService} from "../../../shared/services/elements/ciudad.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../shared/services/alert-service.service";
import {UtilService} from "../../../shared/services/util.service";
import {FieldError, getFormErrors} from "../../../shared/model/FieldError.interface";
import {CustomerI} from "../../../shared/model/customer.interface";
import {CustomerService} from "../../../shared/services/elements/customer.service";

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent {

  id:number;
  customerform: FormGroup;
  customerDetail: CustomerI;
  mesagge: string = "";
  cities: CityI[];
  modalDisableTitle: string;
  selectedCustomerId: number;
  selectedCustomerName: string;
  private errorValidation: string;


  constructor(private formBuilder: FormBuilder,private api:ApiService,private customerService: CustomerService,
              private ciudadService : CiudadService,private route: ActivatedRoute,
              private alertService: AlertService, private utilService: UtilService ) {
  }
  ngOnInit(){
    /*this.ciudadService.getCitiesList().subscribe(data => {
        this.cities = data;
      }
    );*/
    this.doFormBuilder();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.customerService
        .findCustomerById(this.id).subscribe(data => {
        this.customerDetail = data;
        this.setFormValues();
      });
    });
  }

  private doFormBuilder() {
    this.customerform = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerAddress: ['', [Validators.required, Validators.minLength(4)]],
      customerCity: ['', [Validators.required]],
      customerTelephone: ['', [Validators.required, Validators.minLength(4)]],
      customerCloseMonthDay: ['', ]
    });
  }

  update(): void {
    this.setFormValues();
    if (this.customerform.valid) {
      this.customerService.update(this.id,this.customerDetail).subscribe(
        data => {
          this.alertService.success('Cliente modificado correctamente');
        }
      );
    } else {
      let errors: FieldError[] = []
      getFormErrors(this.customerform, "root", "", errors);
      errors.forEach(elem => {
        this.mesagge = this.utilService.getValidationFormErrorMessagge(elem,this.mesagge);
      });
      ///this.employeeService.showMessageError(this.mesagge,20000);
      this.alertService.error(this.mesagge);
      this.ngOnInit();
    }
  }

  private setFormValues() {
    this.customerform.patchValue({
      customerName: this.customerDetail.customerName,
      customerAddress: this.customerDetail.address,
      customerCity: this.customerDetail.city,
      customerTelephone: this.customerDetail.telephone,
      customerCloseMonthDay: this.customerDetail.closeMonthDay
    });
  }

  setSelectedCustomerId(customer: CustomerI) {
    this.modalDisableTitle = "Modificar cliente";
    this.selectedCustomerId = customer.id;
    this.selectedCustomerName = customer.customerName ;

  }

}
