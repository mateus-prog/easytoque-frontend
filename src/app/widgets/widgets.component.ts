import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  countApproved: number = 0;
  isApproved: boolean = false;
  showButton: boolean = false;

  requests!: any;
  withdrawalsMade: number = 0;
  withdrawalsToBeMade: number = 0;
  withdrawalsToBeMadeFormat!: string;
  countRequestWaiting: number = 0;

  constructor(
    private requestService: RequestService,
    private router: Router,
  ) { }

  async ngOnInit(){
    this.requests = await this.requestService.getAll().toPromise();
    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
    this.totalSales = this.salesTotal.salesApproved;
    this.countApproved = this.salesTotal.countApproved;
    this.isApproved = this.salesTotal.isApproved;
    this.withdrawalsToBeMade = await getValueComission(this.totalSales, this.requests);
    this.countRequestWaiting = await getStatusWaiting(this.requests);
    this.withdrawalsToBeMadeFormat = this.withdrawalsToBeMade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    this.showButton = this.router.url.indexOf('/withdraw') > -1 && this.withdrawalsToBeMade > 0 && this.countRequestWaiting == 0 ? false : true;
  }

  withdraw(){
    this.router.navigate(['/withdraw']);
  }
}