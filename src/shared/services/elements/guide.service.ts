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
  private disableurl =  "/disable";

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
    debugger;
    return this.api.put(GuideService.END_POINT_GUIDE + this.disableurl+"/"+guideId);
  }
}
