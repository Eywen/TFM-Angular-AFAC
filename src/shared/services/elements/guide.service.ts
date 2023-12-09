import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {CustomerI} from "../../model/customer.interface";
import {ApiService} from "../api.service";
import {AlertService} from "../alert-service.service";
import {GuideI} from "../../model/guide.interface";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  static END_POINT_GUIDE = environment.REST_BACKEND + '/guide';

  constructor(private api : ApiService, private alertService: AlertService) {  }

  findCustomerById(id: number): Observable<GuideI> {
    return this.api
      .get(GuideService.END_POINT_GUIDE+"/"+id)
      ;
  }
}
