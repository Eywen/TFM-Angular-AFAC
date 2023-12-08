import { Component } from '@angular/core';

import {CustomerService} from "../../../shared/services/elements/customer.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert-service.service";
import {UtilService} from "../../../shared/services/util.service";
import {CustomerI} from "../../../shared/model/customer.interface";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: Array<CustomerI>;
  page = 0;
  size = 10;
  order = "customerName";
  acs = true;
  isFirstPage = false;
  isLastPage = false;
  totalPages: Array<number>;
  selectedCustomerId: number;
  modalDisableTitle: string;
  selectedCustomerName: string;

  constructor(private customerService: CustomerService, private router: Router,
              private alertService: AlertService, private utilService: UtilService){  }

  ngOnInit(){
    this.getCustomerActivateList();
  }

  /*getCustomerList(){
    this.customerService.getCustomerListPage(this.page,this.size,this.order,this.acs).subscribe(data => {
        // @ts-ignore
        this.customers = data.content;
        // @ts-ignore
        this.isFirstPage = data.first;
        // @ts-ignore
        this.isLastPage = data.last;
        // @ts-ignore
        this.totalPages = new Array(data['totalPages']);
      }
    )
  }*/
  getCustomerActivateList(){
    this.customerService.getCustomerActivateListPage(this.page,this.size,this.order,this.acs).subscribe(data => {
        // @ts-ignore
        this.customers = data.content;
        // @ts-ignore
        this.isFirstPage = data.first;
        // @ts-ignore
        this.isLastPage = data.last;
        // @ts-ignore
        this.totalPages = new Array(data['totalPages']);
      }
    )
  }

  sort(order : string) {
    this.acs = !this.acs;
    this.order = order;
    this.getCustomerActivateList();
  }

  rewind() {
    if (!this.isFirstPage){
      this.page--;
      this.getCustomerActivateList();
    }
  }
  forward() {
    if (!this.isLastPage){
      this.page++;
      this.getCustomerActivateList();
    }
  }

  setPage(page: number){
    this.page = page;
    this.getCustomerActivateList();
  }

  addCustomer() {
    this.router.navigate(['/afac/addCustomer']);
  }


  confirmDisable(customerId: number) {
    this.customerService.disable(customerId).subscribe(() => {
      (async () => {
        // Do something before delay
        this.alertService.success("Cliente eliminado correctamente");
        //wait time 3 s
        await this.utilService.delaytime(3000);
        // Do something after
        this.getCustomerActivateList();
      })();

    }, error => {
      this.alertService.error('Error al intentar eliminar el cliente, contacte con el administrador del sistema');
    });
  }

  setSelectedCustomerId(customer: CustomerI) {
    this.modalDisableTitle = "Eliminar cliente";
    this.selectedCustomerId = customer.id;
    this.selectedCustomerName = customer.customerName ;
  }
}
