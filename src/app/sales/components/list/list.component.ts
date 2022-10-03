import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';

import { RequestService } from 'src/app/requests/service/request.service';

import { getValueComission, toDate, toString, transformToDate } from 'src/app/helper/global';
import { UtilityService } from 'src/app/helper/utility';

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
  date_start: any = '';
  date_end: any = '';
  
  statusRequest!: IStatusRequest[];
  
  module: string = 'Venda';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private requestService: RequestService,
    private utilityService: UtilityService,
  ) { }

  async ngOnInit(){
    this.sales = await this.requestService.getRequestStore('list').toPromise();
    this.requests = await this.requestService.getAll().toPromise();
    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
    this.totalSales = this.salesTotal.salesApproved;
    
    this.withdrawalsToBeMade = getValueComission(this.totalSales, this.requests);
  }

  filterRequest() {
    var a = this.filterNumber();
    var b = this.filterRangeDate(a);
    return b.reverse();
  }

  filterNumber(){
    var resultFilter = this.sales.filter((i: any) => {
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