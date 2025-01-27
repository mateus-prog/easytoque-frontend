import { Component, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

import { ReasonService } from 'src/app/reasons/service/reason.service';

@Component({
  selector: 'app-modal-reason',
  templateUrl: './modal-reason.component.html',
  styleUrls: ['./modal-reason.component.css']
})
export class ModalReasonComponent {

  @Input() id!: string;
  @Input() idRequest!: string;
  @Input() title!: string;
  @Input() buttonCancel!: string;
  @Input() buttonConfirm!: string;
  @Input() reason!: string;
  disabled: boolean = true;

  @Output() confirmReason = new EventEmitter<boolean>();

  constructor(
    private reasonService: ReasonService,
  ) { }

  confirmModal(){
    this.createReason();
    this.confirmReason.emit(true);
  }

  cancelModal(){
    this.confirmReason.emit(false);
  }

  ReasonRequest(event: any){
    this.reason = event.target.value;
    this.disabled = this.reason.length > 1 ? false : true;
  }

  private translateFormCreate() {
    let dataForm = {'reason': this.reason, 'request_id': this.idRequest};
    return dataForm;
  }

  private createReason() {
    const data = this.translateFormCreate();
    
    this.reasonService.create(data)
      .pipe(first())
      .subscribe(() => {
        window.location.href = '/requests/visualize/'+this.idRequest;
      })
      .add();
  }

}