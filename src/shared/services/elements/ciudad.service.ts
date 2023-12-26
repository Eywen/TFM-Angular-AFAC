import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {EmployeeI} from "../../model/Employee.interface";
import {ApiService} from "../api.service";
import {CityI} from "../../model/city.interface";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  static END_POINT_CITY = environment.REST_BACKEND+'/ciudad';
  //'http://localhost:8080' + '/ciudad';

  constructor(private api : ApiService) {  }
  getCitiesList ( ) : Observable<CityI[]> {
    return this.api
      .get(CiudadService.END_POINT_CITY);
  }
}
