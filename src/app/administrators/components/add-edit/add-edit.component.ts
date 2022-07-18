import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { IRole } from 'src/app/roles/IRole';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { PartnerService } from 'src/app/partners/service/partner.service';
import { RoleService } from 'src/app/roles/service/role.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddEditComponent implements OnInit {

  role!: any;
  roles!: IRole[];

  idUser!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  password!: string;
  role_id!: number;

  form!: FormGroup;
  isAddMode!: boolean;
  loading = false;
  submitted = false;  

  module = 'Administrador';
  breadcrumbModule: string = this.module;
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private roleService: RoleService,
    private alertService: AlertService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id'];
    this.isAddMode = !this.idUser;
    
    this.isAddMode ? this.breadcrumbAction = 'Cadastrar' : this.breadcrumbAction = 'Editar';

    this.roleService.getAll()
      .pipe(first())
      .subscribe(roles => this.roles = roles.filter((i: any) => { 
        return i.name != 'partner' ? i : ''; 
      }));

    this.form = this.formBuilder.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role_id: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.partnerService.getById(this.idUser)
          .pipe(first())
          .subscribe(x => this.form.patchValue(x));
    }
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
    if (this.isAddMode) {
      this.createAdministrator();
    } else {
      this.updateAdministrator();
    }
  }

  private translateFormCreate(){
    let dataForm = this.form.value;
    dataForm['status_user_id'] = 1;
    return dataForm;
  }

  private createAdministrator() {
    const data = this.translateFormCreate();

    this.partnerService.create(data)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success(this.module+' cadastrado com sucesso', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  private updateAdministrator() {
    this.partnerService.update(this.idUser, this.form.value)
        .pipe(first())
        .subscribe(() => {
            this.alertService.success(this.module+' atualizado com sucesso', { keepAfterRouteChange: true });
            this.router.navigate(['../../'], { relativeTo: this.route });
        })
        .add(() => this.loading = false);
}

  backClicked() {
    this._location.back();
  }

}