import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.css']
})
export class ModalStoreComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() store: any;

  constructor() { }

  async ngOnInit() {}
}