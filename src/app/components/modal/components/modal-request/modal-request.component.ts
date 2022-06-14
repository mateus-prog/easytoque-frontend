import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-request',
  templateUrl: './modal-request.component.html',
  styleUrls: ['./modal-request.component.css']
})
export class ModalRequestComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() request: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {}

  editDataBank(request: any) {
    this.router.navigate(['/partners/edit-bank-data/'+request.hash_id]);
  }

}