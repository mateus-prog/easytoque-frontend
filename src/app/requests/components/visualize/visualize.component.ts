import { IRequest } from './../../IRequest';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { RequestService } from 'src/app/requests/service/request.service';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.css']
})
export class VisualizeComponent implements OnInit {
  id: string = '';
  value: number = 0;
  bank_id: string = '';
  agency: string = '';
  user_id: string = '';
  checking_account: string = '';
  cnpj: string = '';
  status_request_id: string = '';
  reason?: string = '';
  hash_id: string = '';

  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';
  messageModal: string = '';


  module: string = 'Solicitaçõe';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Visualizar';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];

    this.requestService.getById(this.id)
      .pipe(first())
      .subscribe(x => this.translateToForm(x));
  }

  private translateToForm(request: any){
    this.value = request.value;
    this.bank_id = request.bank_id;
    this.agency = request.agency;
    this.user_id = request.user_id;
    this.checking_account = request.checking_account;
    this.cnpj = request.cnpj;
    this.status_request_id = request.status_request_id;
    this.reason = request.reason;
    this.hash_id = request.hash_id;
  }

  showModal(){
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'Salvar';
    this.title = 'Motivo da negação';
  }
}