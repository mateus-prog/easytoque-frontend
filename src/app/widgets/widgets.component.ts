import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/requests/service/request.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./../list.component.css']
})
export class WidgetsComponent implements OnInit {
  salesTotal!: any;

  constructor(
    private requestService: RequestService
  ) { }

  async ngOnInit(){
    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
  }
}