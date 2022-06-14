import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-corporate',
  templateUrl: './modal-corporate.component.html',
  styleUrls: ['./modal-corporate.component.css']
})
export class ModalCorporateComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() corporate: any;

  constructor() { }

  async ngOnInit() {}

}