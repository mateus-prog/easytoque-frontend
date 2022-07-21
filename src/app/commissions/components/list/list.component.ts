import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { RequestService } from 'src/app/requests/service/request.service';
import { StatusRequestService } from 'src/app/status-request/service/status-request.service';

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
    private alertService: AlertService,
  ) { }

  async ngOnInit(){
    this.requests = await this.requestService.getByUser().toPromise();
    this.statusRequest = await this.statusRequestService.getAll().toPromise();
  }

  filterRequest() {
    var a = this.filterNumber();
    var b = this.filterStatusRequest(a);
    return b;
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
}