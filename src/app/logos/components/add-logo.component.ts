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
  isUpload!: boolean;
  disabledUploadLogo!: boolean;
  disabledRemoveLogo!: boolean;
  
  form!: FormGroup;
  loading = false;
  submitted = false;

  maximumSizeUpload: number = 5242880;
  extensionAllowedUpload: string[] = ['jpg', 'jpeg', 'png'];
  extensionAllowedUploadMessage!: string[];
  
  hideMessageSizeUpload!: boolean;
  hideMessageExtensionUpload!: boolean;
  hideMessageVerifyUpload!: boolean;

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
    this.hideMessageVerifyUpload = true;
    this.hideMessageSizeUpload = false;
    this.hideMessageExtensionUpload = false;
    this.isUpload = false;
    this.disabledUploadLogo = true;

    this.form = this.formBuilder.group({
      url_logo: ['', Validators.nullValidator]
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
    this.disabledRemoveLogo = this.url_logo.indexOf('logo_default.png') == -1 ? false : true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if(this.hideMessageVerifyUpload || this.hideMessageSizeUpload || this.hideMessageExtensionUpload)
      {
        return;
      }

      this.loading = true;
      this.disabledUploadLogo = true;
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
    if (event.target.files && event.target.files[0]) {
      this.isUpload = true;
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;

      this.checkFileType(event);
      this.checkFileSize(event.target.files[0].size);
    }

    this.checkNumberOfFiles(event.target.files.length);
    this.disabledUploadLogo = this.hideMessageVerifyUpload || this.hideMessageSizeUpload || this.hideMessageExtensionUpload ? true : false;
  }

  private checkNumberOfFiles(countFile: number){
    this.hideMessageVerifyUpload = countFile != 1 ? true : false;
  }

  private checkFileType(event: any){
    this.hideMessageExtensionUpload = true;
    if(event.target.files[0].type && event.target.files[0].type.split('/')[0] == ["image"]){
      this.extensionAllowedUpload.forEach(data =>{
        event.target.files[0].type.split('/')[1] == data ? this.hideMessageExtensionUpload = false : '';
      });
    }
  }

  private checkFileSize(fileSize: any){
    this.hideMessageSizeUpload = fileSize < this.maximumSizeUpload ? false : true;
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
    this.disabledUploadLogo = true;
  }

  removeLogo() {
    this.logoService.delete()
        .pipe(first())
        .subscribe(data => {
          this.getLogo(data);
          this.alertService.success(this.module+' removido com sucesso');
        });
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