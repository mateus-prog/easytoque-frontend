import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-term-sales',
  templateUrl: './modal-term-sales.component.html',
  styleUrls: ['./modal-term-sales.component.css']
})
export class ModalTermSalesComponent{

  @Input() id!: string;

  constructor() { }
}