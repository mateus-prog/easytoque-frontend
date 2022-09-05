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
  salesTotal!: any;
  totalSales!: any;

  requests!: any;
  withdrawalsMade: number = 0;
  withdrawalsToBeMade: number = 0;
  
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
    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
    this.totalSales = this.salesTotal.salesApproved.replace('.', '');
    this.totalSales = this.totalSales.replace(',', '.');
    this.requests.forEach((element: any) => {      
      if(element.value != 'undefined' && element.value != undefined){
        element.value = element.value.replace('.', ''); 
        element.value = element.value.replace(',', '.'); 
        this.withdrawalsMade += parseFloat(element.value);
      }
    });

    this.withdrawalsToBeMade = this.totalSales - this.withdrawalsMade;
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