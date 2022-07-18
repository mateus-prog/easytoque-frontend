import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmComponent } from 'src/app/components/modal/components/modal-confirm';
import { ModalResponsibleComponent } from 'src/app/components/modal/components/modal-responsible';
import { ModalCorporateComponent } from 'src/app/components/modal/components/modal-corporate';
import { ModalBankComponent } from 'src/app/components/modal/components/modal-bank';
import { ModalRequestComponent } from 'src/app/components/modal/components/modal-request';
import { ModalReasonComponent } from 'src/app/components/modal/components/modal-reason';
import { ModalUserBlockedComponent } from 'src/app/components/modal/components/modal-user-blocked';

@NgModule({
  declarations: [
    ModalConfirmComponent,
    ModalResponsibleComponent,
    ModalCorporateComponent,
    ModalBankComponent,
    ModalRequestComponent,
    ModalReasonComponent,
    ModalUserBlockedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalConfirmComponent,
    ModalResponsibleComponent,
    ModalCorporateComponent,
    ModalBankComponent,
    ModalRequestComponent,
    ModalReasonComponent,
    ModalUserBlockedComponent
  ]
})

export class ModalModule { }