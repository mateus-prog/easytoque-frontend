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
import { ModalStoreComponent } from 'src/app/components/modal/components/modal-store';

@NgModule({
  declarations: [
    ModalConfirmComponent,
    ModalResponsibleComponent,
    ModalCorporateComponent,
    ModalBankComponent,
    ModalReasonComponent,
    ModalUserBlockedComponent,
    ModalUploadComponent,
    ModalTermSalesComponent,
    ModalStoreComponent
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
    ModalTermSalesComponent,
    ModalStoreComponent
  ]
})

export class ModalModule { }