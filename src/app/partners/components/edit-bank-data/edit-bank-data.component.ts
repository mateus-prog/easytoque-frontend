import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { IBank } from 'src/app/banks/IBank';

import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { AlertService } from 'src/app/components/alert/service/alert.service';
import { MailService } from 'src/app/components/mail/service/mail.service';
import { PartnerCorporateService } from 'src/app/partners/service/partner_corporate.service';
import { PartnerBankService } from 'src/app/partners/service/partner_bank.service';
import { BankService } from 'src/app/banks/service/bank.service';
import { ClickSignService } from 'src/app/clicksign/service/clicksign.service';

import MailBody from 'src/app/helper/mail';

@Component({
  selector: 'edit-bank-data',
  templateUrl: './edit-bank-data.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class EditBankDataComponent implements OnInit {

  banks!: IBank[];
  isAlter!: boolean;
  isError!: boolean;
  display!: boolean;
  class!: string;

  idHash!: string;
  idPartner!: number;
  email!: string;
  name!: string; 
  corporate_name!: string;
  cnpj!: number;

  form!: FormGroup;
  loading = false;
  submitted = false;

  breadcrumbModule: string = 'Dados Bancários';
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partnerCorporateService: PartnerCorporateService,
    private partnerBankService: PartnerBankService,
    private bankService: BankService,
    private clicksignService: ClickSignService,
    private mailService: MailService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.idHash = this.route.snapshot.params['id'];
    this.isAlter = false;
    this.isError = false;
    this.display = false;

    this.bankService.getAll()
      .pipe(first())
      .subscribe(banks => this.banks = banks);
    
    this.form = this.formBuilder.group({
        corporate_name: ['', Validators.nullValidator],
        cnpj: ['', Validators.nullValidator],
        bank_id: ['', Validators.required],
        agency: ['', Validators.required],
        agency_digit: ['', Validators.nullValidator],
        checking_account: ['', Validators.required],
        checking_account_digit: ['', Validators.nullValidator],
        pix: ['', Validators.nullValidator],
        phone: ['', Validators.nullValidator],
        whatsapp: ['', Validators.nullValidator],
        password: ['', Validators.required]
    });

    this.partnerCorporateService.getByHash(this.idHash)
        .pipe(first())
        .subscribe(x => this.translateToForm(x));
      
    this.form.controls['corporate_name'].disable({onlySelf: true});
    this.form.controls['cnpj'].disable({onlySelf: true});

    this.class = this.isAuthenticated() ? 'content-wrapper' : 'background';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.updateBankPartner(this.idPartner);
  }

  private translateToForm(partner: any){
    let dataForm = this.form.value;
    
    this.display = true;

    if(partner == null){
      this.isError = true;
    }else{
      this.isError = false;

      dataForm['corporate_name'] = partner.corporate_name;
      dataForm['cnpj'] = partner.cnpj;
      dataForm['phone'] = partner.phone;
      dataForm['whatsapp'] = partner.whatsapp;

      this.email = partner.email;
      this.name = partner.first_name + ' ' + partner.last_name;
      this.corporate_name = partner.corporate_name;
      this.cnpj = partner.cnpj;

      this.idPartner = partner.id;

      this.form.patchValue(dataForm);
    }
  }

  private updateBankPartner(id: number) {
    const data = this.form.value;
    data.bank_id = parseInt(data.bank_id);
    this.partnerBankService.update(id, data)
        .pipe(first())
        .subscribe(() => {
          this.isAlter = true;
          //email de bem vindo
          const dataMail = this.createMailCompleteUser();
          this.mailService.sendMail(dataMail.mailRecipient, dataMail.mailSubject, dataMail.mailBody)
            .subscribe();

          this.clicksignService.createSigner(this.idPartner)
          .subscribe(dataSignerResponse => {
            let data = JSON.parse(JSON.stringify(dataSignerResponse)) 
            if(data.status == 'success'){  
              this.alertService.success('Enviado com sucesso!');
            }else{
              this.alertService.error(data.message);
            }    
          });
        })
        .add(() => this.loading = false);
  }

  private createMailCompleteUser() {
    let dataForm = this.form.value;

    //dataForm['mailRecipient'] = 'parceiros@easytoque.com.br'    
    dataForm['mailRecipient'] = 'mateus.guizelini@hotmail.com'; //default password
    dataForm['mailSubject'] = "[Parceiros Easytoque] - Mais um parceiro finalizou o cadastro";
    dataForm['mailBody'] = this.createMailCompleteRegisterBody(this.name, this.corporate_name, this.email);

    return dataForm;
  }

  createMailCompleteRegisterBody(name: string, corporate_name: string, email: string){
    let body = `
    <p>Ol&aacute;,</p>
        <p>
            Informamos que o seguinte parceiro finalizou seu cadastro
        </p>
    <p>
      <ul>
        <li><b>Nome:</b> `+name+`</li>
        <li><b>Empresa:</b> `+corporate_name+`</li>
        <li><b>E-mail:</b>  `+email+`</li>
      </ul>
    </p>`;
    let mailHtml = MailBody(body);
    return mailHtml;
  }

  isAuthenticated() {
    let isLoggedAdmin: any;
    isLoggedAdmin = this.authenticationService.isLoggedIn();
    
    return isLoggedAdmin;
  }

  backClicked() {
    this._location.back();
  }

}