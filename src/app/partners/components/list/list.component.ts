import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PartnerService } from 'src/app/partners/service/partner.service';
import { PartnerCorporateService } from 'src/app/partners/service/partner_corporate.service';
import { PartnerBankService } from 'src/app/partners/service/partner_bank.service';
import { IPartner } from 'src/app/partners/IPartner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  public currentResponsible: any = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    cpf: '',
    phone: '',
    whatsapp: '',
    status_user_id: '',
  };
  public currentCorporate: any = {
    id: 0,
    corporate_name: '',
    cnpj: '',
    address: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    cep: '',
    state_id: '',
  }
  public currentBank: any = {
    id: 0,
    bank: '',
    agency: '',
    agency_digit: '',
    checking_account: '',
    checking_account_digit: '',
    pix: '',
    type_transfers_id: 0,
  }
  currentPartner: any;
  currentInUse: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';
  messageModal: string = '';
  filter: string = '';

  partners!: IPartner[];

  module: string = 'Parceiro';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private partnerService: PartnerService,
    private partnerCorporateService: PartnerCorporateService,
    private partnerBankService: PartnerBankService
  ) { }

  async ngOnInit(){
    this.partners = await this.partnerService.getByRole(4).toPromise();
  }

  partnersFilter() {
    if (this.filter.length >= 2) {
      var a = this.partners.filter((i: any) => {
        return Object.keys(i).filter(x => (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : false).length>0
      });
      
      return a;
    }

    return this.partners;
  }

  showModal(partner: IPartner){
    this.currentPartner = partner.email;
    this.currentInUse = false;
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'BLOQUEAR';
    this.title = 'Confirma bloqueio do ' + this.module;
  }

  showModalResponsible(responsible: any){
    this.currentResponsible = responsible;
    this.title = responsible.first_name + ' ' + responsible.last_name;
  }

  async showModalCorporate(corporate: any){
     let response = await this.partnerCorporateService.getByUser(corporate.id).toPromise();
     this.currentCorporate = response[0];
     this.title = corporate.first_name + ' ' + corporate.last_name;
  }

  async showModalBank(bank: any){
    let response = await this.partnerBankService.getByUser(bank.id).toPromise();
    this.currentBank = response[0];
    this.title = bank.first_name + ' ' + bank.last_name;
 }

 blockPartner(id: number) {
    /*var data = {
      status_user_id: 2
    }
    this.partnerService.block(id, data)
      .pipe(first())
      .subscribe(() => this.partners = this.partners.filter(x => x.id !== id));*/
  }

  confirm(confirm: boolean){
    if(confirm){
      this.blockPartner(this.currentPartner);
    }
  }

}