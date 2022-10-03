import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';

import { UtilityService } from 'src/app/helper/utility';

import { RequestService } from 'src/app/requests/service/request.service';
import { StatusRequestService } from 'src/app/status-request/service/status-request.service';

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
    url_invoice: '',
  };

  id: string = '';
  status_request_id: number = 0;
  status_name: string = '';
  date_start: any = '';
  date_end: any = '';
  
  requests!: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';

  statusRequest!: IStatusRequest[];
  
  module: string = 'Comissõe';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private requestService: RequestService,
    private statusRequestService: StatusRequestService,
    private utilityService: UtilityService,
  ) { }

  async ngOnInit(){
    this.requests = await this.requestService.getByUser().toPromise();
    this.statusRequest = await this.statusRequestService.getAll().toPromise();
  }

  filterRequest() {
    var a = this.filterNumber();
    var b = this.filterStatusRequest(a);
    var c = this.filterRangeDate(b);
    return c.reverse();
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
}