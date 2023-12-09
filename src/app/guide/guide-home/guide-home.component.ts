import { Component } from '@angular/core';
import {GuideService} from "../../../shared/services/elements/guide.service";
import {GuideI} from "../../../shared/model/guide.interface";
import {DatePipe, formatDate} from "@angular/common";


@Component({
  selector: 'app-guide-home',
  templateUrl: './guide-home.component.html',
  styleUrls: ['./guide-home.component.css'],
  providers: [DatePipe]
})
export class GuideHomeComponent {

  numGuide: number;
  guideDetail: GuideI;
  modalTitle: string = "Detalle Guía";

  constructor(private guideService: GuideService) {
  }

  ngOnInit(){
    /*debugger;
    this.findByGuideId();*/
  }

  findByGuideId() {
    debugger;
    this.guideService
      .findCustomerById(this.numGuide).subscribe(data => {
      this.guideDetail = data;
      this.guideDetail.formatEntryDate = formatDate(data.entryDate, 'yyyy-MM-dd','en-US');
      this.guideDetail.formatassignmentDate = formatDate(data.assignmentDate, 'yyyy-MM-dd','en-US');
      this.guideDetail.formatDeliveryDate = formatDate(data.deliveryDate, 'yyyy-MM-dd','en-US');
    });
  }

}
