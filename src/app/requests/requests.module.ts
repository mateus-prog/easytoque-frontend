import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';

import { RequestsRoutingModule } from './requests-routing.module';
import { ListComponent } from './components/list';
import { VisualizeComponent } from './components/visualize';

import { AlertModule } from 'src/app/components/alert/alert.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ModalModule } from 'src/app/components/modal/modal.module';

import { DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { TranslateService } from '@ngx-translate/core';

export const MY_DATE_FORMAT = {
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    ListComponent,
    VisualizeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RequestsRoutingModule,
    AlertModule,
    ModalModule,
    BreadcrumbModule,
    NgxMaskModule.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: 'googleTagManagerId',  useValue: 'GTM-M5NCC3N' },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService],
    },
    DatePipe
  ],
  exports:[
    ListComponent,
    VisualizeComponent
  ]
})

export class RequestsModule { }