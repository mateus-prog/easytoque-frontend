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
  idRequest!: string;
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
  invoice: string = '';
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
    private alertService: AlertService,
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
    this.user_id = request.user_id;
    this.checking_account = request.checking_account;
    this.cnpj = request.cnpj;
    this.status_request_id = request.status_request_id;
    this.reason = request.reason;
    this.hash_id = request.hash_id;

    this.invoice = 'assets/comprovantes/'+request.id+'.pdf';
  }

  showModal(){
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'Salvar';
    this.title = 'Preencha o Motivo';
  }

  async confirmReason(confirm: boolean){
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

  /*onSelectImage(event: any) {
    this.selectedImage = new FormData();
    this.selectedImage.append('file', event.srcElement.files[0], event.srcElement.files[0].name);
    console.log(this.selectedImage);
  }

  onCreateService(form: FormGroup) {
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
   console.log(formData);
  }*/

}