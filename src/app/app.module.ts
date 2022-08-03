import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/helper';
//import { RecaptchaModule } from 'ng-recaptcha';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';


import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/template/header';
import { FooterComponent } from 'src/app/template/footer';
import { SidebarComponent } from 'src/app/template/sidebar';

import { AlertModule } from 'src/app/components/alert/alert.module';
import { ModalModule } from 'src/app/components/modal/modal.module';
//import { RangeDatepickerModule } from 'src/app/components/range-datepicker/range-datepicker.module';

import { EditBankDataComponent } from 'src/app/partners/components/edit-bank-data';
import { LoginComponent } from 'src/app/login/components/login';
import { ChangePasswordComponent } from 'src/app/login/components/change-password';
import { ForgotPasswordComponent } from 'src/app/login/components/forgot-password';

import { AddLogoComponent } from 'src/app/logos/components/add-logo.component';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EditBankDataComponent,
    LoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    AddLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    //RecaptchaModule,
    ModalModule,
    BreadcrumbModule,
    NgxMaskModule.forRoot()//,
    //RangeDatepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
