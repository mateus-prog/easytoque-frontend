import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { MessageService } from 'src/app/components/message/service/message.service';
import { PartnerService } from 'src/app/partners/service/partner.service';

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.css']
})
export class ModalStoreComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() store: any;

  loading = false;

  constructor(
    private partnerService: PartnerService,
    private messageService: MessageService,
  ) { }

  async ngOnInit() {}

  async sendMailPartnerFinish(){
    this.loading = true;
    await this.partnerService.sendMailPartnerFinish(this.store.id)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success('Enviado e-mail dos Dados da Loja com sucesso');
      })
      .add(() => this.loading = false);
  }
}