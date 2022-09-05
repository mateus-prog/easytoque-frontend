import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/requests/service/request.service';

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

  constructor(
    private requestService: RequestService
  ) { }

  async ngOnInit(){
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
    this.withdrawalsToBeMade
    .toFixed(2) // casas decimais
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}