import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';
import { IPartner } from 'src/app/partners/IPartner';

import { RequestService } from 'src/app/requests/service/request.service';
import { StatusRequestService } from 'src/app/status-request/service/status-request.service';
import { PartnerService } from 'src/app/partners/service/partner.service';

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
    return c.reverse();
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

  showModal(request: any){
    this.currentRequest = request;
    this.title = request.first_name + ' ' + request.last_name;
  }
}