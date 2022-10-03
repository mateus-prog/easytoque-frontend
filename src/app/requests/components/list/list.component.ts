import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';
import { IPartner } from 'src/app/partners/IPartner';

import { RequestService } from 'src/app/requests/service/request.service';
import { StatusRequestService } from 'src/app/status-request/service/status-request.service';
import { PartnerService } from 'src/app/partners/service/partner.service';

import { UtilityService } from 'src/app/helper/utility';

import { toDate, toString, transformToDate } from 'src/app/helper/global';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  public currentRequest: any = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    cpf: '',
    phone: '',
    whatsapp: '',
    status_user_id: '',
    hash_id: '',
  };

  id: string = '';
  status_request_id: number = 0;
  user_id: number = 0;
  date_start: any = '';
  date_end: any = '';

  status_name: string = '';
  user_name: string = '';

  requests!: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';

  statusRequest!: IStatusRequest[];
  partners!: IPartner[];

  module: string = 'Solicitaçõe';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private requestService: RequestService,
    private statusRequestService: StatusRequestService,
    private partnerService: PartnerService,
    private utilityService: UtilityService,
  ) { }

  async ngOnInit(){
    this.requests = await this.requestService.getAll().toPromise();
    
    this.partners = await this.partnerService.getByRole(4).toPromise();
    this.statusRequest = await this.statusRequestService.getAll().toPromise();
  }

  filterRequest() {
    var a = this.filterNumber();
    var b = this.filterStatusRequest(a);
    var c = this.filterUser(b);
    var d = this.filterRangeDate(c);
    return d.reverse();
  }

  filterUser(result: any){
    var resultFilter = result.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'user_id' && this.user_id == i[x]) || this.user_id == 0) ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterStatusRequest(result: any){
    var resultFilter = result.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'status_request_id' && this.status_request_id == i[x]) || this.status_request_id == 0) ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterNumber(){
    var resultFilter = this.requests.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'id' && this.id == i[x]) || this.id == '') ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterRangeDate(result: any){
    if(this.date_start != '' && this.date_end != '')
    {
      let dateStartFormat = this.utilityService.formatDateToStringServer(this.date_start);
      dateStartFormat = transformToDate(dateStartFormat);
    
      let dateEndFormat = this.utilityService.formatDateToStringServer(this.date_end);
      dateEndFormat = transformToDate(dateEndFormat);
      
      let d1 = toDate(dateStartFormat),
          d2 = toDate(dateEndFormat),
          intervalos = new Array();

      intervalos.push( toString(d1) );

      while ( d1 < d2 ) {
        d1.setDate( d1.getDate() + 1 );
        intervalos.push( toString(d1) );
      }

      var resultFilter = result.filter((i: any) => {
        return Object.keys(i).filter(x => 
          //console.log(x + ' = ' + intervalos.indexOf(i[x]))
          (x == 'updated_at' && intervalos.indexOf(i[x]) >= 0) ? true : false
        ).length > 0
      });

      return resultFilter;
    }

    return result;
  }

  showModal(request: any){
    this.currentRequest = request;
    this.title = request.first_name + ' ' + request.last_name;
  }
}