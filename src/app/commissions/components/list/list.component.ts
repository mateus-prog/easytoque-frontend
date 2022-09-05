import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter } from "@angular/material/core";

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
    url_invoice: '',
  };

  id: string = '';
  status_request_id: number = 0;
  status_name: string = '';
  
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
  ) { }

  async ngOnInit(){
    this.requests = await this.requestService.getByUser().toPromise();
    this.statusRequest = await this.statusRequestService.getAll().toPromise();
  }

  filterRequest() {
    var a = this.filterNumber();
    var b = this.filterStatusRequest(a);
    return b.reverse();
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