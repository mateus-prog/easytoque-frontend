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

  private createPartner() {
    const data = this.translateFormCreate();
    
    this.partnerService.create(data)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success('Parceiro cadastrado com sucesso.', { autoClose: false }); 
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  backClicked() {
    this._location.back();
  }

}