import { Component } from '@angular/core';
import {GuideService} from "../../../shared/services/elements/guide.service";
import {GuideI} from "../../../shared/model/guide.interface";
import {DatePipe, formatDate} from "@angular/common";
import {AlertService} from "../../../shared/services/alert-service.service";
import {UtilService} from "../../../shared/services/util.service";
import {SearchGuideI} from "../../../shared/model/searchGuideOption";


@Component({
  selector: 'app-guide-home',
  templateUrl: './guide-home.component.html',
  styleUrls: ['./guide-home.component.css'],
  providers: [DatePipe]
})
export class GuideHomeComponent {

  numGuide: number;
  searchValue: string;
  guideDetail: GuideI;
  modalTitle: string = "Detalle Guía";
  selectedGuideId: number;
  modalDisableTitle: string;
  searchOptionList: SearchGuideI[];
  searchOption: string;
  guideSearch: GuideI[];

  constructor(private guideService: GuideService, private alertService: AlertService, private utilService: UtilService) {
  }

  ngOnInit(){
    this.iniGuideToEmpty();

    this.guideService.getSearchOption().subscribe(data => {
      debugger;
      this.searchOptionList = data;
    });
  }

  private iniGuideToEmpty() {

  }

  findByGuideId() {
    console.log("busqueda: " + this.numGuide);
    this.guideService
      .findByGuideId(this.numGuide).subscribe(data => {
      this.guideDetail = data;
      this.guideDetail.formatEntryDate = formatDate(data.entryDate, 'yyyy-MM-dd','en-US');
      this.guideDetail.formatassignmentDate = formatDate(data.assignmentDate, 'yyyy-MM-dd','en-US');
      this.guideDetail.formatDeliveryDate = formatDate(data.deliveryDate, 'yyyy-MM-dd','en-US');
      this.clearDetailGuideTable();
      this.clearSearchOptions();
      this.guideSearch.push(this.guideDetail);
    });
  }

  private clearDetailGuideTable() {
    if(this.guideSearch.length > 0) {
      this.guideSearch = new Array(0);
    }
  }

  findSearchOption() {
    console.log("busqueda: " + this.searchOption);
    this.guideService
      .findSearchOption(this.searchOption, this.searchValue).subscribe(data => {
      this.guideSearch = data;
      this.guideSearch.forEach(guide => {
        guide.formatEntryDate = formatDate(guide.entryDate, 'yyyy-MM-dd','en-US');
        guide.formatassignmentDate = formatDate(guide.assignmentDate, 'yyyy-MM-dd','en-US');
        guide.formatDeliveryDate = formatDate(guide.deliveryDate, 'yyyy-MM-dd','en-US');
      });
    });
  }

  setSelectedEmployeeId(guide: GuideI) {
    this.guideDetail = guide;
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

  private clearSearchOptions() {
    this.searchOption = "";
    this.searchValue = "";
  }
}
