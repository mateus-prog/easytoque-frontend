import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-bank',
  templateUrl: './modal-bank.component.html',
  styleUrls: ['./modal-bank.component.css']
})
export class ModalBankComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() bank: any;

  constructor() { }

  async ngOnInit() {}

  editDataBank(bank: any) {
    window.location.href = '/partners/edit-bank-data/'+bank.hash_id;
  }

}