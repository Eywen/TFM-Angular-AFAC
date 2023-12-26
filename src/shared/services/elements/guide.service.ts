import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {catchError, Observable, throwError} from "rxjs";
import {CustomerI} from "../../model/customer.interface";
import {ApiService} from "../api.service";
import {AlertService} from "../alert-service.service";
import {GuideI} from "../../model/guide.interface";
import {EmployeeI} from "../../model/Employee.interface";
import {CityI} from "../../model/city.interface";
import {SearchGuideI} from "../../model/searchGuideOption";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  static END_POINT_GUIDE = environment.REST_BACKEND + '/guide';
  private disableurl =  "/disable";
  private statesurl =  "/status";
  private search ="/search";
  private searchoptionurl =  "/searchoption";

  constructor(private api : ApiService, private alertService: AlertService) {  }

  findByGuideId(id: number): Observable<GuideI> {
    return this.api
      .get(GuideService.END_POINT_GUIDE+"/"+id)
      ;
  }

  update(numGuide: number, guide: GuideI) {
    return this.api
      .put(GuideService.END_POINT_GUIDE+"/"+numGuide,guide)
      ;
  }

  disable(guideId: number) {
    return this.api.put(GuideService.END_POINT_GUIDE + this.disableurl+"/"+guideId);
  }

  createGuide(guide: GuideI): Observable<GuideI> {
    return this.api
      .post(GuideService.END_POINT_GUIDE, guide)
      .pipe(
        catchError(response => {
          if ([409].includes(response.status)) {
            //if (error.status === 409) {
            // Manejo específico para el estado 409
            const errorMessage = "La guia: " + guide.idGuide + " ya existe";
            //this.showMessageError(errorMessage,  5000);
            this.alertService.error(errorMessage);
          } else {

            // Si no es un error 409, propagar el error original
            this.alertService.error("Error al crear la guia");
          }
          return throwError(response.error);
        })
      )

      ;
  }

  getStates(): Observable<string[]> {
      return this.api
        .get(GuideService.END_POINT_GUIDE + this.statesurl);
  }

  getSearchOption():Observable<SearchGuideI[]> {
    return this.api
      .get(GuideService.END_POINT_GUIDE + this.search + this.searchoptionurl);
  }

  findSearchOption(searchOption: string, searchValue: string):Observable<GuideI[]> {
    return this.api
      .get(GuideService.END_POINT_GUIDE + this.search + "/" + searchOption + "/" + searchValue);
  }
}
