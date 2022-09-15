import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/requests/service/request.service';

import { getValueComission, getStatusWaiting } from 'src/app/helper/global';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./../list.component.css']
})
export class WidgetsComponent implements OnInit {
  sales!: any;
  salesTotal!: any;
  totalSales!: any;

  requests!: any;
  withdrawalsMade: number = 0;
  withdrawalsToBeMade: number = 0;
  withdrawalsToBeMadeFormat!: string;
  countRequestWaiting: number = 0;

  constructor(
    private requestService: RequestService
  ) { }

  async ngOnInit(){
    this.requests = await this.requestService.getAll().toPromise();
    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
    this.totalSales = this.salesTotal.salesApproved;
    this.withdrawalsToBeMade = getValueComission(this.totalSales, this.requests);
    this.countRequestWaiting = getStatusWaiting(this.requests);
    this.withdrawalsToBeMadeFormat = this.withdrawalsToBeMade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
  }
}