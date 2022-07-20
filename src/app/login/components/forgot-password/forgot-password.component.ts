import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { LoginService } from 'src/app/login/service/login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public form!: FormGroup;
  public loading = false;
  public errorMessage?: string;
  public attemptedSubmit = false;
  public successfullySent = false;
  public captchaVisibleAnimation = false;

  constructor(
    private loginService:LoginService,
    private _location: Location
  ) { }
  email=''

  recaptchaSite="6LfA-U8dAAAAAGsmrv3RmDgTGgb7E3HPB6VGPPcV"

  ngOnInit(): void {

  this.form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required])
  });
  }

  get login(): FormControl { return this.form.get('login') as FormControl; }
  get token(): FormControl { return this.form.get('token') as FormControl; }

  ngAfterViewInit() {
    setTimeout(() => this.captchaVisibleAnimation = true, 100);
  }

  onCaptchaResolved(captchaResponse: string) {
    this.token.setErrors(captchaResponse === '' ? {required: true} : null);
    this.token.setValue(captchaResponse);
    this.token.markAsDirty();
    this.token.markAsTouched();
  }

  async onSubmitClick() {
    this.errorMessage = '';
    this.attemptedSubmit = true;
    if (this.form.invalid) {
      if (!this.form.dirty) {
        this.form.markAsDirty();
      }
      return;
    }
    if (this.successfullySent) {
      return;
    }
    const login = this.login.value;
    const token = this.token.value;
    this.loading = true;
    try {
      const response = await this.loginService.forgotPassword(login, token).toPromise();
      /*if (response.email !='') {
        this.successfullySent = true;
        this.email=response.email;
      } else {
        console.log(response);
        this.errorMessage = "Unexpected server response";
      }*/
    } catch(err:any) {
      if (typeof err.message === "string" && err.message.length > 0) {
        this.errorMessage = err.message;
      } else {
        console.log(err);
        //this.errorMessage = 'Unknown component error';
        this.errorMessage = 'Usuário não encontrado';
      }
    }
    this.loading = false;
  }

  backClicked() {
    this._location.back();
  }

}
