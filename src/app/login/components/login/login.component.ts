import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { LoginService } from 'src/app/login/service/login.service';
import { AuthenticationService } from '../../../../service/authentication/authentication.service'
import { MenuService } from 'src/app/template/sidebar/service/menu.service';

import { IMenu } from 'src/app/template/sidebar/IMenu';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  menus!: IMenu[];

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private menuService: MenuService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  async onSubmit() {
    this.submitted = true;
    
    /*if (this.form.invalid) {
      return;
    }*/

    this.loading = true;

    try {
      let data = await this.loginService.login(this.form.controls.email.value, this.form.controls.password.value);
      this.authenticationService.login(data);
      this.loading = false;
      let roleId = parseInt(this.authenticationService.getRoleId());
      
      this.menus = await this.menuService.getByRoleId(roleId)
        .pipe(first())
        .toPromise();

      //vai para primeira pagina encontrada
      this.router.navigate([this.menus[0].url]);
    }
    catch (e) {
      this.loading = false;
      this.alertService.clear();
      this.alertService.error('Usuário e senha incorretos', { keepAfterRouteChange: true });
    }

  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  getRole(){
    return this.authenticationService.getRoleId()
  }

}
