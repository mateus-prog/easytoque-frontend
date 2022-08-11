import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmComponent } from 'src/app/components/modal/components/modal-confirm';
import { ModalResponsibleComponent } from 'src/app/components/modal/components/modal-responsible';
import { ModalCorporateComponent } from 'src/app/components/modal/components/modal-corporate';
import { ModalBankComponent } from 'src/app/components/modal/components/modal-bank';
import { ModalReasonComponent } from 'src/app/components/modal/components/modal-reason';
import { ModalUserBlockedComponent } from 'src/app/components/modal/components/modal-user-blocked';
import { ModalUploadComponent } from 'src/app/components/modal/components/modal-upload';
import { ModalTermSalesComponent } from 'src/app/components/modal/components/modal-term-sales';

@NgModule({
  declarations: [
    ModalConfirmComponent,
    ModalResponsibleComponent,
    ModalCorporateComponent,
    ModalBankComponent,
    ModalReasonComponent,
    ModalUserBlockedComponent,
    ModalUploadComponent,
    ModalTermSalesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalConfirmComponent,
    ModalResponsibleComponent,
    ModalCorporateComponent,
    ModalBankComponent,
    ModalReasonComponent,
    ModalUserBlockedComponent,
    ModalUploadComponent,
    ModalTermSalesComponent
  ]
})

export class ModalModule { }