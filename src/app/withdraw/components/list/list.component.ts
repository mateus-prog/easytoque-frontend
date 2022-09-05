import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { IRequest } from 'src/app/requests/IRequest';

import { MessageService } from 'src/app/components/message/service/message.service';
import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { PartnerCorporateService } from 'src/app/partners/service/partner_corporate.service';
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

  public corporate: any = {
    cnpj: '',
  }

  file!: File | null;
  fileName!: string;
  isUpload!: boolean;
  disabledUpload!: boolean;
  checkValueTerm!: boolean;

  form!: FormGroup;
  loading = false;
  submitted = false;

  maximumSizeUpload: number = 5242880;
  extensionAllowedUpload: string[] = ['pdf'];
  extensionAllowedUploadMessage!: string[];
  
  hideMessageSizeUpload!: boolean;
  hideMessageExtensionUpload!: boolean;
  hideMessageVerifyUpload!: boolean;
  
  module: string = 'Venda';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private partnerCorporateService: PartnerCorporateService,
    private partnerBankService: PartnerBankService,
    private requestService: RequestService,
    private messageService: MessageService,
  ) { }

  async ngOnInit(){
    this.checkValueTerm = false;
    this.hideMessageVerifyUpload = true;
    this.hideMessageSizeUpload = false;
    this.hideMessageExtensionUpload = false;
    this.isUpload = false;
    this.disabledUpload = true;

    this.form = this.formBuilder.group({
      url_invoice: ['', Validators.nullValidator]
    });

    this.extensionAllowedUploadMessage = this.extensionAllowedUpload.map(
      x => `${x.toUpperCase()}`
    );

    this.fileName = 'Selecione uma nota fiscal';
    
    this.id = this.getUser();
    let responseDataBank = await this.partnerBankService.getByUser(this.id).toPromise();
    this.dataBank = responseDataBank[0];

    let responseCorporate = await this.partnerCorporateService.getByUser(this.id).toPromise();
    this.corporate = responseCorporate[0];

    this.salesTotal = await this.requestService.getRequestStore('sum').toPromise();
  }

  getUser(){
    return this.authenticationService.getUserId()
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if(this.hideMessageVerifyUpload || this.hideMessageSizeUpload || this.hideMessageExtensionUpload)
      {
        return;
      }

      this.loading = true;
      this.disabledUpload = true;
      this.createSales();
  }

  transformMegaBytes(): number{
    return (this.maximumSizeUpload / 1024) / 1024;
  }

  private translateFormCreateOrUpdate(fileToUpload: any){
    let dataForm = this.form.value;
    delete dataForm.url_invoice;

    const formData: FormData = new FormData();
    formData.append('url_invoice', fileToUpload, fileToUpload.name);
    formData.append('value', this.salesTotal.salesApproved);

    return formData;
  }

  checkTerm(){
    this.checkValueTerm = this.checkValueTerm == false ? true : false;
    this.verifyCondition();
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.isUpload = true;
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;

      this.checkFileType(event);
      this.checkFileSize(event.target.files[0].size);
    }

    this.checkNumberOfFiles(event.target.files.length);
    this.verifyCondition();
  }

  verifyCondition(){
    this.disabledUpload = this.hideMessageVerifyUpload || this.hideMessageSizeUpload || this.hideMessageExtensionUpload || !this.checkValueTerm ? true : false;
  }

  private checkNumberOfFiles(countFile: number){
    this.hideMessageVerifyUpload = countFile != 1 ? true : false;
  }

  private checkFileType(event: any){
    this.hideMessageExtensionUpload = true;
    if(event.target.files[0].type && event.target.files[0].type.split('/')[1] == ["pdf"]){
      this.extensionAllowedUpload.forEach(data =>{
        event.target.files[0].type.split('/')[1] == data ? this.hideMessageExtensionUpload = false : '';
      });
    }
  }

  private checkFileSize(fileSize: any){
    this.hideMessageSizeUpload = fileSize < this.maximumSizeUpload ? false : true;
  }

  private createSales() {
    const data = this.translateFormCreateOrUpdate(this.file);
    
    this.requestService.uploadInvoice(data)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' atualizado com sucesso');
        this.router.navigate(['/commissions']);
      })
      .add(() => this.loading = false);

    this.disabledUpload = true;
  }

}