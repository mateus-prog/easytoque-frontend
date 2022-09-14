import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { IBank } from 'src/app/banks/IBank';

import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { BankService } from 'src/app/banks/service/bank.service';
import { PartnerCorporateService } from 'src/app/partners/service/partner_corporate.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class MyAccountComponent implements OnInit {

  banks!: IBank[];
  currentURL!: string;


  form!: FormGroup;
  loading = false;
  submitted = false;

  breadcrumbModule: string = 'Minha Conta';
  breadcrumbAction: string = 'Visualizar';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private partnerCorporateService: PartnerCorporateService,
    private bankService: BankService,
  ) { }

  ngOnInit(): void {

    this.bankService.getAll()
      .pipe(first())
      .subscribe(banks => this.banks = banks);

    this.form = this.formBuilder.group({
        cnpj: ['', Validators.nullValidator],
        name: ['', Validators.nullValidator],
        email: ['', Validators.nullValidator],
        phone: ['', Validators.nullValidator],
        whatsapp: ['', Validators.nullValidator],
        bank_id: ['', Validators.nullValidator],
        agency: ['', Validators.nullValidator],
        checking_account: ['', Validators.nullValidator],
        pix: ['', Validators.nullValidator],
        url: ['', Validators.nullValidator]
    });

    let hash_id = this.getUserHashId();

    this.partnerCorporateService.getByHash(hash_id)
        .pipe(first())
        .subscribe(x => this.translateToForm(x));
    
    this.form.controls['cnpj'].disable({onlySelf: true});
    this.form.controls['name'].disable({onlySelf: true});
    this.form.controls['email'].disable({onlySelf: true});
    this.form.controls['phone'].disable({onlySelf: true});
    this.form.controls['whatsapp'].disable({onlySelf: true});
    this.form.controls['bank_id'].disable({onlySelf: true});
    this.form.controls['agency'].disable({onlySelf: true});
    this.form.controls['checking_account'].disable({onlySelf: true});
    this.form.controls['pix'].disable({onlySelf: true});
    this.form.controls['url'].disable();
  }

  getUserHashId() {
    return this.authenticationService.getUserHashId();
  }

  private translateToForm(partner: any){
    let dataForm = this.form.value;
    
    dataForm['name'] = partner.first_name+' '+partner.last_name;

    dataForm['email'] = partner.email;
    dataForm['cnpj'] = partner.cnpj;
    dataForm['phone'] = partner.phone;
    dataForm['whatsapp'] = partner.whatsapp;

    dataForm['bank_id'] = partner.bank_id;

    partner.agency = partner.agency_digit != '' && partner.agency_digit != null ? partner.agency += '-' + partner.agency_digit : partner.agency;
    partner.checking_account = partner.checking_account_digit != '' && partner.checking_account_digit != null ? partner.checking_account += '-' + partner.checking_account_digit : partner.checking_account;

    dataForm['agency'] = partner.agency;
    dataForm['checking_account'] = partner.checking_account;
    dataForm['pix'] = partner.pix;
    dataForm['url'] = 'https://loja.easytoque.com.br/?___store=loja_'+partner.client_id;
    
    this.form.patchValue(dataForm);
  }

  copyLink(){
    this.form.controls['url'].enable();
    (<HTMLInputElement> document.getElementById("url")).select();
    document.execCommand('copy');
    this.form.controls['url'].disable();
  }

}