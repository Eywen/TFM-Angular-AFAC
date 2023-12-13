import { Component } from '@angular/core';
import {GuideService} from "../../../shared/services/elements/guide.service";
import {GuideI} from "../../../shared/model/guide.interface";
import {DatePipe, formatDate} from "@angular/common";
import {AlertService} from "../../../shared/services/alert-service.service";
import {UtilService} from "../../../shared/services/util.service";


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
  selectedGuideId: number;
  modalDisableTitle: string;

  constructor(private guideService: GuideService, private alertService: AlertService, private utilService: UtilService) {
  }

  ngOnInit(){
    this.iniGuideToEmpty();
  }

  private iniGuideToEmpty() {

  }

  findByGuideId() {
    this.guideService
      .findByGuideId(this.numGuide).subscribe(data => {
      this.guideDetail = data;
      this.guideDetail.formatEntryDate = formatDate(data.entryDate, 'yyyy-MM-dd','en-US');
      this.guideDetail.formatassignmentDate = formatDate(data.assignmentDate, 'yyyy-MM-dd','en-US');
      this.guideDetail.formatDeliveryDate = formatDate(data.deliveryDate, 'yyyy-MM-dd','en-US');
    });
  }

  setSelectedEmployeeId(guide: GuideI) {
    this.modalDisableTitle = "Eliminar guía";
    this.selectedGuideId = guide.idGuide;
  }

  confirmDisable(guideId: number) {
    this.guideService.disable(guideId).subscribe(() => {
      (async () => {
        // Do something before delay
        this.alertService.success("Guía eliminada correctamente");
        //wait time 3 s
        await this.utilService.delaytime(3000);
        // Do something after
        this.ngOnInit();
      })();

    }, error => {
      this.alertService.error('Error al intentar eliminar la guia, contacte con el administrador del sistema');
    });
  }
}
