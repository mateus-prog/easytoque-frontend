import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-bank',
  templateUrl: './modal-bank.component.html',
  styleUrls: ['./modal-bank.component.css']
})
export class ModalBankComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() bank: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {}

  editDataBank(bank: any) {
    //url = '/partners/edit-bank-data/{{bank.hash_id}}';
    window.location.href = '/partners/edit-bank-data/'+bank.hash_id;
  }

}