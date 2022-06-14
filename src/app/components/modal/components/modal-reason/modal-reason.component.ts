import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-reason',
  templateUrl: './modal-reason.component.html',
  styleUrls: ['./modal-reason.component.css']
})
export class ModalReasonComponent {

  @Input() id!: string;
  //@Input() idReason!: number;
  @Input() title!: string;
  @Input() buttonCancel!: string;
  @Input() buttonConfirm!: string;

  //@Output() confirm = new EventEmitter<boolean>();

  reason!: string;

  constructor() { }

  confirmModal(){
    //this.confirm.emit(true);
  }

  cancelModal(){
    //this.confirm.emit(false);
  }

}