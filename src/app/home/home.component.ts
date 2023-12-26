import { Component } from '@angular/core';
import {UtilService} from "../../shared/services/util.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  area: string = "";

  constructor(private utilService: UtilService) {
  }

  showHome() {
    return this.utilService.isShowHome();
  }

  showLogin(){
    if (this.utilService.isShowLogin()){
      this.area = "area"
    } else {
      this.area = "asd";
    }
  }

}
