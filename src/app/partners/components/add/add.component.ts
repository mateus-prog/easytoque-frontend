import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { IState } from 'src/app/states/IState';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { MailService } from 'src/app/components/mail/service/mail.service';
import { PartnerService } from 'src/app/partners/service/partner.service';
import { StateService } from 'src/app/states/service/state.service';

import MailBody from 'src/app/helper/mail';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddComponent implements OnInit {

  state!: any;
  states!: IState[];

  corporate_name!: string;
  cnpj!: number;
  cep!: number;
  address!: string;
  state_id!: number;
  city!: string;
  district!: string;
  number!: number;
  complement!: string;

  first_name!: string;
  last_name!: string;
  cpf!: number;
  email!: string;
  phone!: number;
  whatsapp!: number;


  form!: FormGroup;
  loading = false;
  submitted = false;

  breadcrumbModule: string = 'Parceiro';
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private stateService: StateService,
    private mailService: MailService,
    private alertService: AlertService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.stateService.getAll()
      .pipe(first())
      .subscribe(states => this.states = states);

    this.form = this.formBuilder.group({
        corporate_name: ['', Validators.required],
        cnpj: ['', Validators.required],
        cep: ['', Validators.required],
        address: ['', Validators.required],
        state_id: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required],
        number: ['', Validators.required],
        complement: ['', Validators.nullValidator],
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.nullValidator],
        whatsapp: ['', Validators.nullValidator],
        commission: ['', Validators.required],
    });
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
      this.createPartner();
  }

  changeCep(event: Event){
    let cep = (<HTMLInputElement>event.target).value;
    if(cep.length == 9){
      this.partnerService.getAddressByCep(cep)
        .pipe(first())
        .subscribe(
          data => {
            this.stateService.getByName(data.uf)
              .pipe(first())
              .subscribe(state => {
                this.state = state
                this.form.patchValue({
                  address: data.logradouro,
                  city: data.localidade,
                  district: data.bairro,
                  state_id: this.state[0]['id']
                });
              })
          },
          error => {
            this.alertService.error(error);
          }
        );
    }
  }

  private translateFormCreate() {
    let dataForm = this.form.value;
    
    dataForm['password'] = '12345678'; //default password
    dataForm['status_user_id'] = 3; //status pendente
    dataForm['role_id'] = 4; //tipo parceiro
    return dataForm;
  }
  
  private createMailWelcome() {
    let dataForm = this.form.value;

    dataForm['mailRecipient'] = dataForm['email']; //default password
    dataForm['mailSubject'] = dataForm['first_name'] + ", bem vindo parceiro Easytoque";
    dataForm['mailBody'] = this.createMailWelcomeBody(dataForm['first_name']);

    return dataForm;
  }

  private createMailDataBankUser(id: any) {
    let dataForm = this.form.value;

    dataForm['mailRecipient'] = dataForm['email']; //default password
    dataForm['mailSubject'] = dataForm['first_name'] + ", complete seu cadastro como parceiro Easytoque";
    let link = 'http://localhost:4200/partners/edit-bank-data/'+id;
    dataForm['mailBody'] = this.createMailDataBankUserBody(dataForm['first_name'], link);

    return dataForm;
  }

  private createPartner() {
    const data = this.translateFormCreate();
    
    this.partnerService.create(data)
        .pipe(first())
        .subscribe(data => {
          this.alertService.success('Parceiro cadastrado com sucesso.', { autoClose: false });
          setTimeout(() => {
            if(data.hash_id)
            { 
              //email de bem vindo
              const dataMail = this.createMailWelcome();
              this.mailService.sendMail(dataMail.mailRecipient, dataMail.mailSubject, dataMail.mailBody)
                .subscribe(dataMailWelcomeResponse => {
                  let data = JSON.parse(JSON.stringify(dataMailWelcomeResponse)) 
                  data.status == 'success' ? this.alertService.success(data.message) : this.alertService.error(data.message);
                });

              //email de dados bancarios
              const dataMailDataBankUser = this.createMailDataBankUser(data.hash_id);
              this.mailService.sendMail(dataMail.mailRecipient, dataMail.mailSubject, dataMail.mailBody)
                .subscribe(dataMailDataBankUserResponse => {
                  let data = JSON.parse(JSON.stringify(dataMailDataBankUserResponse)) 
                  data.status == 'success' ? this.alertService.success(data.message) : this.alertService.error(data.message);
                });
            }
      
            this.router.navigate(['../'], { relativeTo: this.route });
          }, 2000);


        })
        .add(() => this.loading = false);
  }

  createMailWelcomeBody(name: string){
    let body = `
      <p>Ol&aacute;, `+name+`</p>
      <p style="color: green;">Muito obrigado pela confian&ccedil;a e o interesse em se tornar um parceiro <b>Easytoque</b>.</p>
      <p>Seu cadastro foi aprovado.</p>
      <p>Para lhe auxiliar compartilho as pr&oacute;ximas etapas:</p>
      <p><strong>Informa&ccedil;&otilde;es iniciais:</strong></p>
      <ul>
          <li>1. Ser&aacute; encaminhado um e-mail para <strong>cadastrar seus dados banc&aacute;rios</strong>.</li> 
          <li>2. Ap&oacute;s completar o cadastro que foi enviado no primeiro e-mail, enviaremos o <strong>contrato de presta&ccedil;&atilde;o de servi&ccedil;o.</strong><br>Esse contrato &eacute; assinado digitalmente, com validade legal.</li>
          <li>3. Ap&oacute;s a assinatura do Contrato, enviaremos o <strong>link da sua loja e os dados de acesso ao seu painel administrativo.</strong></li>
          <li>4. Por fim, vamos encaminhar alguns e-mails indicando nossos <strong>materiais de apoio</strong>, falando dos nossos produtos.</li>
      </ul>
      <p>Quaisquer d&uacute;vidas estaremos a disposi&ccedil;&atilde;o no WhatsApp (11) 94559-8672 ou atrav&eacute;s do e-mail parceiros@easytoque.com.br.</p>
      <p>
          Atenciosamente, 
      </p>`;
    let mailHtml = MailBody(body);
    return mailHtml;
  }

  createMailDataBankUserBody(name: string, link: string){
    let body = `
      <p>Ol&aacute;, <b>`+name+`</b>.</p><br>
      <p>
          Estamos entrando em contato pois precisamos que voc&ecirc; preencha o restante das informa&ccedil;&otilde;es em seu cadastro de parceiro Easytoque e assine o contrato.
      </p><br>
      <p>
          Para concluir seu cadastro, clique no link abaixo
      </p>
      <a href="`+link+`">Concluir meu cadastro</a>`;

      let mailHtml = MailBody(body);
      return mailHtml;
  }

  backClicked() {
    this._location.back();
  }

}