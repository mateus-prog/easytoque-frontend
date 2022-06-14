import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;
  public errorMessage?: string;
  public attemptedSubmit = false;
  public successfullySent = false;

  private token!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }


  breadcrumbModule: string = 'Usuário';
  breadcrumbAction: string = 'Trocar Senha';

  ngOnInit() {

    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required])
    }, this.checkPasswords2);
  }

  checkPasswords2: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  checkPasswords() {
    return this.password === this.passwordConfirm ? {notSame: false } : { notSame: true };
  }

  get password(): FormControl { return this.form.get('password') as FormControl; }
  get passwordConfirm(): FormControl { return this.form.get('passwordConfirm') as FormControl; }
  get currentPassword(): FormControl { return this.form.get('currentPassword') as FormControl; }

  async onSubmitClick() {
    this.errorMessage = '';
    this.attemptedSubmit = true;
    if (this.form.invalid) {
      if (!this.form.dirty) {
        this.form.markAsDirty();
      }
      return;
    }
    const password = this.password.value;
    const passwordConfirm = this.passwordConfirm.value;
    this.loading = true;
    try {
      const response = await (await this.loginService.changePassword(password, passwordConfirm)).toPromise();
      if (response === true) {
        this.successfullySent = true;
        this.loading = false;
      } else {

      }
    } catch(err:any) {
      if (typeof err.message !== "string" || !err.message) {
        console.error(err);
      }
      this.loading = false;
      this.attemptedSubmit = false; // Supress form validation errors
      this.errorMessage = ((err && err.message ? err.message : err) || "Unknown error").toString();
    }
  }

}