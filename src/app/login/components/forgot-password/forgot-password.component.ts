import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'src/app/components/message/service/message.service';
import { LoginService } from 'src/app/login/service/login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  messageError: string = '';

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private loginService:LoginService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  async onSubmitClick() {
    this.messageError = '';
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      var response = await this.loginService.forgotPassword(this.form.controls.email.value).toPromise();
      if(response != null){
        this.messageService.success('E-mail com senha enviada com sucesso.');
      }else{
        this.messageService.error('Usuário não encontrado');  
      }
      this.loading = false;
    }
    catch (e) {
      this.loading = false;
      this.messageService.success('Erro ao enviar e-mail com senha.');
    }
  }

  backClicked() {
    this._location.back();
  }

}
