import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {ApiService} from "../api.service";
import {AlertService} from "../alert-service.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  static END_POINT_EMPLOYEE = environment.REST_BACKEND + '/customers';
  //static END_POINT_EMPLOYEE = 'http://localhost:8080' + '/employees';
  private findAll = "/readall";
  private findAllActivate = "/readallactivate?";
  private findAllPage = "/readallpage?";
  private disableurl = "/disable";

  constructor(private api : ApiService, private alertService: AlertService) {  }

  getCustomerActivateListPage(page: number, size: number, order: string, asc: boolean) {
    return this.api
      .get(CustomerService.END_POINT_EMPLOYEE + this.findAllActivate + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  disable(customerId: number) {
    return this.api.put(CustomerService.END_POINT_EMPLOYEE+this.disableurl+"/"+customerId);
  }
}
