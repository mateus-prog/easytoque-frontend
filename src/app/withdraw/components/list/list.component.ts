import { Component, OnInit } from '@angular/core';
import { IRequest } from 'src/app/requests/IRequest';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { PartnerBankService } from 'src/app/partners/service/partner_bank.service';
import { RequestService } from 'src/app/requests/service/request.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  
  id: any = '';
  salesTotal!: any;
  public dataBank: any = {
    id: 0,
    bank: '',
    agency: '',
    checking_account: '',
    pix: '',
    type_transfers_id: 0,
    hash_id: ''
  }
  
  module: string = 'Venda';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private authenticationService: AuthenticationService,
    private partnerBankService: PartnerBankService,
    private requestService: RequestService,
    private alertService: AlertService,
  ) { }

  async ngOnInit(){
    this.id = this.getUser();
    let response = await this.partnerBankService.getByUser(this.id).toPromise();

    this.dataBank = response[0];

    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
  }

  getUser(){
    return this.authenticationService.getUserId()
  }
}