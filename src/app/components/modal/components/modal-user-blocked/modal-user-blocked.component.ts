import { Component, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

import { PartnerService } from 'src/app/partners/service/partner.service';

@Component({
  selector: 'app-modal-user-blocked',
  templateUrl: './modal-user-blocked.component.html',
  styleUrls: ['./modal-user-blocked.component.css']
})
export class ModalUserBlockedComponent {

  @Input() id!: string;
  @Input() currentPartner!: number;
  @Input() title!: string;
  @Input() buttonCancel!: string;
  @Input() buttonConfirm!: string;
  @Input() reason!: string;
  disabled: boolean = true;

  @Output() confirmReason = new EventEmitter<boolean>();

  constructor(
    private partnerService: PartnerService,
  ) { }

  confirmModal(){
    this.updateUserBlocked();
    this.confirmReason.emit(true);
  }

  cancelModal(){
    this.confirmReason.emit(false);
  }

  ReasonUserBlocked(event: any){
    this.reason = event.target.value;
    this.disabled = this.reason.length > 1 ? false : true;
  }

  private translateFormCreate() {
    let dataForm = {'reason': this.reason};
    return dataForm;
  }

  private updateUserBlocked() {
    const data = this.translateFormCreate();
    
    this.partnerService.blockedPartner(this.currentPartner, data)
      .pipe(first())
      .subscribe(() => {
        window.location.href = '/partners';
      })
      .add();
  }

}