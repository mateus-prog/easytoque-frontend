import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { CpfCnpjValidator } from 'src/app/validators/cpf-cnpj/cpf-cnpj.validator';
import { NumberValidator } from 'src/app/validators/number/number.validator';

import { IState } from 'src/app/states/IState';

import { MessageService } from 'src/app/components/message/service/message.service';
import { PartnerService } from 'src/app/partners/service/partner.service';
import { StateService } from 'src/app/states/service/state.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddEditComponent implements OnInit {

  state!: any;
  states!: IState[];

  id!: number;
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
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  module = 'Parceiro';
  breadcrumbModule: string = this.module;
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private stateService: StateService,
    private messageService: MessageService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.cnpj = this.route.snapshot.params['cnpj'];
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.stateService.getAll()
      .pipe(first())
      .subscribe(states => this.states = states);

    this.form = this.formBuilder.group({
        corporate_name: ['', Validators.required],
        cnpj: ['', [Validators.required, Validators.minLength(14), CpfCnpjValidator.validate]],
        cep: ['', [Validators.required, Validators.minLength(8)]],
        address: ['', Validators.required],
        state_id: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required],
        number: ['', Validators.required],
        complement: ['', Validators.nullValidator],
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', [Validators.required, CpfCnpjValidator.validate]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.nullValidator],
        whatsapp: ['', Validators.nullValidator],
        commission: ['', [Validators.required, NumberValidator.validate]],
    });

    if (!this.isAddMode) {
      /*this.activitieService.getById(this.idAtividade)
        .pipe(first())
        .subscribe(x => this.translateToForm(x));*/
    }else{
      this.translateToForm();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }

      this.loading = true;
      if (this.isAddMode) {
        this.createPartners();
      } else {
        this.updatePartners();
      }
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
            this.messageService.error(error);
          }
        );
    }
  }

  async translateToForm(){
    let dataForm = this.form.value;
    dataForm.cnpj = this.cnpj;
    this.form.patchValue(dataForm);

    this.form.controls['cnpj'].disable({onlySelf: true});
  }

  private translateFormCreate() {
    let dataForm = this.form.value;
    
    dataForm['cnpj'] = this.cnpj;
    dataForm['password'] = '12345678'; //default password
    dataForm['status_user_id'] = 3; //status pendente
    dataForm['role_id'] = 4; //tipo parceiro
    return dataForm;
  }

  private createPartners() {
    const data = this.translateFormCreate();
    
    this.partnerService.create(data)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' cadastrado com sucesso.');
        this.router.navigate(['/partners']);
      })
      .add(() => this.loading = false);
  }

  private updatePartners() {
    const data = this.translateFormCreate();
    
    this.partnerService.update(this.id, data)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' atualizado com sucesso.');
        this.router.navigate(['/partners']);
      })
      .add(() => this.loading = false);
  }

  backClicked() {
    this._location.back();
  }

}