import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { AlertService } from 'src/app/components/alert/service/alert.service';
import { LogoService } from 'src/app/logos/service/logo.service';

import { ILogo } from 'src/app/logos/ILogo';

@Component({
  selector: 'app-add-logo',
  templateUrl: './add-logo.component.html',
  styleUrls: ['./../../add-edit.component.css']
})

export class AddLogoComponent implements OnInit {

  id!: any;
  url_logo!: string;
  getLogoPath!: any;

  file!: File | null;
  fileName!: string;

  hideButtonRemoveLogo!: boolean;
  
  form!: FormGroup;
  loading = false;
  submitted = false;

  maximumSizeUpload: number = 5242880;
  extensionAllowedUpload: string[] = ['jpg', 'jpeg', 'png'];
  extensionAllowedUploadMessage!: string[];
  
  hideMessageSizeUpload: boolean = false;
  hideMessageExtensionUpload: boolean = true;
  hideMessageMaximumUpload: boolean = false;
  hideMessageMinimumUpload: boolean = false;
  hideMessageVerifyUpload: boolean = true;

  module: string = 'Logo';
  breadcrumbModule:string = this.module;
  breadcrumbAction:string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private logoService: LogoService,
    private alertService: AlertService,
    private _location: Location
  ) { }

  async ngOnInit(){
    
    this.form = this.formBuilder.group({
      url_logo: ['', Validators.required]
    });

    this.extensionAllowedUploadMessage = this.extensionAllowedUpload.map(
      x => `${x.toUpperCase()}`
    );

    this.getLogoPath = await this.logoService.getByUser().toPromise();
    this.url_logo = this.getLogoPath['path'];
    this.fileName = 'Selecione um logo';
    this.verifyLogo();
  }

  getUser(){
    return this.authenticationService.getUserId()
  }

  verifyLogo(){
    this.hideButtonRemoveLogo = this.url_logo.indexOf('logo_default.png') == -1 ? true : false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
      //if(this.hideMessageVerifyUpload || this.hideMessageExtensionUpload
      //|| this.hideMessageMinimumUpload || this.hideMessageMaximumUpload){    
        return;
      }

      this.loading = true;
      this.createLogo();
  }

  transformMegaBytes(): number{
    return (this.maximumSizeUpload / 1024) / 1024;
  }

  private translateFormCreateOrUpdate(fileToUpload: any){
    let dataForm = this.form.value;
    delete dataForm.url_logo;

    const formData: FormData = new FormData();
    formData.append('url_logo', fileToUpload, fileToUpload.name);

    return formData;
  }

  handleFileInput(event: any) {
    this.hideMessageVerifyUpload = true;
    this.hideMessageExtensionUpload = false;

    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;

      if(event.target.files[0].type && event.target.files[0].type.split('/')[0] == ["image"]){
        
        this.extensionAllowedUpload.forEach(data =>{
          event.target.files[0].type.split('/')[1] == data ? this.hideMessageExtensionUpload = true : '';
        });
        
        this.hideMessageSizeUpload = event.target.files[0].size < this.maximumSizeUpload ? false : true;
      }

      this.hideMessageVerifyUpload = false;
    }

    this.hideMessageUpload(event.target.files.length);
  }

  private hideMessageUpload(countFile: number){
    this.hideMessageMinimumUpload = false;
    this.hideMessageMaximumUpload = false;

    if(countFile == 0){
      this.hideMessageMinimumUpload = true;
    }else if(countFile > 1){
      this.hideMessageMaximumUpload = true;
    }
  }

  private createLogo() {
    const data = this.translateFormCreateOrUpdate(this.file);
    
    this.logoService.create(data)
        .pipe(first())
        .subscribe(data => {
            this.getLogo(data);
            this.alertService.success(this.module+' atualizado com sucesso');
        })
        .add(() => this.loading = false);
  }

  removeLogo() {
    this.logoService.delete()
        .pipe(first())
        .subscribe(data => {
          this.getLogo(data);
          this.alertService.success(this.module+' removido com sucesso');
        })
        .add(() => this.loading = false);
  }

  private getLogo(data: any){
    this.getLogoPath = data;
    this.url_logo = this.getLogoPath['path'];
    this.verifyLogo();
    this.fileName = 'Selecione um logo';
  }

  backClicked() {
    this._location.back();
  }

}