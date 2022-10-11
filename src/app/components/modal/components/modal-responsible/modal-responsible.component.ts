import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { MessageService } from 'src/app/components/message/service/message.service';
import { PartnerService } from 'src/app/partners/service/partner.service';

@Component({
  selector: 'app-modal-responsible',
  templateUrl: './modal-responsible.component.html',
  styleUrls: ['./modal-responsible.component.css']
})
export class ModalResponsibleComponent implements OnInit {

  @Input() id!: any;
  @Input() title!: string;
  @Input() responsible: any;

  constructor(
    private partnerService: PartnerService,
    private messageService: MessageService,
  ) { }

  async ngOnInit() {}

  async sendMailWelcome(){
    await this.partnerService.sendMailWelcome(this.responsible.id)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success('Enviado e-mail de boas vindas com sucesso');
      });
  }

}