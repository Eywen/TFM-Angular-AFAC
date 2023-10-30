import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {EmployeeI} from "../../model/Employee.interface";
import {ApiService} from "../api.service";
import {CityI} from "../../model/city.interface";

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  static END_POINT_CITY = 'http://localhost:8080' + '/ciudad';

  constructor(private api : ApiService) {  }
  getCitiesList ( ) : Observable<CityI[]> {
    return this.api
      .get(CiudadService.END_POINT_CITY);
  }
}
