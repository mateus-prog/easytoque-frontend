import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-responsible',
  templateUrl: './modal-responsible.component.html',
  styleUrls: ['./modal-responsible.component.css']
})
export class ModalResponsibleComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() responsible: any;

  constructor() { }

  async ngOnInit() {}

}