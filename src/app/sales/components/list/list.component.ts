import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';

import { RequestService } from 'src/app/requests/service/request.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  
  id: any = '';
  sales!: any;
  totalSales!: number;

  requests!: any;
  totalRequestsSales!: number;
  
  statusRequest!: IStatusRequest[];
  
  module: string = 'Venda';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private requestService: RequestService,
  ) { }

  async ngOnInit(){
    this.sales = await this.requestService.getRequestStore('list').toPromise();
    this.requests = await this.requestService.getAll().toPromise();
    this.sales.forEach((element: any) => {      
      element.commission != 'undefined' ? this.totalSales += parseInt(element.commission) : '';
    });

    this.requests.forEach((element: any) => {      
      element.value != 'undefined' ? this.totalRequestsSales += parseInt(element.value) : '';
    });
  }

  filterRequest() {
    var a = this.filterNumber();
    return a.reverse();
  }

  filterNumber(){
    var resultFilter = this.sales.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'id' && this.id == i[x]) || this.id == '') ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }
}