import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';

import { PartnersRoutingModule } from './partners-routing.module';
import { AddComponent } from './components/add';
import { ListComponent } from './components/list';
import { MyAccountComponent } from './components/my-account';

import { AlertModule } from 'src/app/components/alert/alert.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ModalModule } from 'src/app/components/modal/modal.module';

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    PartnersRoutingModule,
    AlertModule,
    ModalModule,
    BreadcrumbModule,
    NgxMaskModule.forRoot()
  ],
  exports:[
    AddComponent,
    ListComponent,
    MyAccountComponent
  ]
})

export class PartnersModule { }