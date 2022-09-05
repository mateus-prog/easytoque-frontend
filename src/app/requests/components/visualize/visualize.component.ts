import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { RequestService } from 'src/app/requests/service/request.service';

import { IRequest } from 'src/app/requests/IRequest';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.css']
})
export class VisualizeComponent implements OnInit {
  idRequest!: string;
  id: string = '';
  value: number = 0;
  bank_id: string = '';
  agency: string = '';
  user_name: string = '';
  checking_account: string = '';
  cnpj: string = '';
  status_request_id: number = 0;
  status_name: string = '';
  reason?: string = '';
  hash_id: string = '';
  url_invoice: string = '';
  selectedImage: any;

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
  ) { }

  ngOnInit(): void{
    this.idRequest = this.route.snapshot.params['id'];

    this.requestService.getById(this.idRequest)
      .pipe(first())
      .subscribe(x => this.translateToForm(x));
  }

  private translateToForm(request: any){
    this.value = request.value;
    this.bank_id = request.bank_id;
    this.agency = request.agency;
    this.user_name = request.user_name;
    this.checking_account = request.checking_account;
    this.cnpj = request.cnpj;
    this.status_name = request.status_name;
    this.status_request_id = request.status_request_id;
    this.reason = request.reason;
    this.hash_id = request.hash_id;

    this.url_invoice = request.url_invoice;
  }

  showModal(){
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'Salvar';
    this.title = 'Preencha o Motivo';
  }

  showModalUpload(){
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'Upload';
    this.title = 'Anexe o comprovante da solicitação';
  }

  async confirmReason(confirm: boolean){
    if(confirm){

      //await this.requestService.updateRequest(this.id, dataForm).toPromise();
      //this.listSubscriptions();
    }
  }

  async confirmUpload(confirm: boolean){
    if(confirm){

      //await this.requestService.updateRequest(this.id, dataForm).toPromise();
      //this.listSubscriptions();
    }
  }

  private translateFormCreate() {
    let dataForm = {'status_request_id': '2'};
    return dataForm;
  }

  updateRequest() {
    const data = this.translateFormCreate();
    let id = parseInt(this.idRequest);
    this.requestService.update(id, data)
      .pipe(first())
      .subscribe(() => {
        window.location.href = '/requests/visualize/'+this.idRequest;
      })
      .add();
  }

}