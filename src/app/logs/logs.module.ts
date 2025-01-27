import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';

import { LogsRoutingModule } from './logs-routing.module';
import { ListComponent } from './components/list';

import { AlertModule } from 'src/app/components/alert/alert.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ModalModule } from 'src/app/components/modal/modal.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    LogsRoutingModule,
    AlertModule,
    ModalModule,
    BreadcrumbModule,
    NgxMaskModule.forRoot()
  ],
  exports:[
    ListComponent
  ]
})

export class LogsModule { }