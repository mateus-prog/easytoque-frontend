import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfCnpjValidator } from 'src/app/validators/cpf-cnpj/cpf-cnpj.validator';

import { PartnerService } from 'src/app/partners/service/partner.service';
import { MessageService } from 'src/app/components/message/service/message.service';

@Component({
  selector: 'app-check-cnpj',
  templateUrl: './check-cnpj.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class CheckCnpjComponent implements OnInit {

  cnpj!: number;
  
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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        cnpj: ['', [Validators.required, Validators.minLength(14), CpfCnpjValidator.validate]],
    });
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
      this.createPartner();
  }

  private createPartner() {
    let cnpj = this.form.value.cnpj;

    this.partnerService.checkCnpj(this.form.value)
      .subscribe(data => {
        if(data == 0){
          this.router.navigate(['/partners/add/'+cnpj]);
        }else{
          this.messageService.error('Este CNPJ ja esta cadastrado no banco.');
        }
        
      })
      .add(() => this.loading = false);
  }

}