import { Component, OnInit } from '@angular/core';

import { PartnerService } from 'src/app/partners/service/partner.service';
import { PartnerCorporateService } from 'src/app/partners/service/partner_corporate.service';
import { PartnerBankService } from 'src/app/partners/service/partner_bank.service';
import { StatusService } from 'src/app/status/service/status.service';

import { IPartner } from 'src/app/partners/IPartner';
import { IStatus } from 'src/app/status/IStatus';

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
    hash_id: ''
  }

  public currentStore: any = {
    id: 0,
    commission: '',
    client_id: 0,
  }

  currentPartner: any;
  currentInUse: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';
  messageModal: string = '';
  action: string = '';

  status_user_id: number = 0;
  filter: string = '';

  statusUsers!: IStatus[];
  partners!: any;

  numberTotal: number = 0;
  loadingTotal!: boolean;
  numberActive: number = 0;
  loadingActive!: boolean;
  numberOutstanding: number = 0;
  loadingOutstanding!: boolean;
  numberBlocked: number = 0;
  loadingBlocked!: boolean;

  module: string = 'Parceiro';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private partnerService: PartnerService,
    private partnerCorporateService: PartnerCorporateService,
    private partnerBankService: PartnerBankService,
    private statusService: StatusService
  ) { }

  async ngOnInit(){
    this.loadingTotal = true;
    this.loadingActive = true;
    this.loadingOutstanding = true;
    this.loadingBlocked = true;

    this.statusUsers = await this.statusService.getAll().toPromise();
    this.listPartners();
  }

  async listPartners(){
    this.partners = await this.partnerService.getByRole(4).toPromise();

    this.numberActive = this.partners.filter((i: { status_user_id: string; }) => i.status_user_id == 'Ativo').length;
    this.loadingActive = false;
    
    this.numberOutstanding = this.partners.filter((i: { status_user_id: string; }) => i.status_user_id == 'Pendente').length;
    this.loadingOutstanding = false;

    this.numberBlocked = this.partners.filter((i: { status_user_id: string; }) => i.status_user_id == 'Bloqueado').length;
    this.loadingBlocked = false;

    this.numberTotal = this.numberActive + this.numberOutstanding + this.numberBlocked;
    this.loadingTotal = false;
  }

  partnersFilter() {
    var a = this.filterStatusUser();
    var b = this.usersFilter(a);
    return b.reverse();
  }

  usersFilter(result: any) {
    if (this.filter.length >= 2) {
      var resultFilter = result.filter((i: any) => {
        return Object.keys(i).filter(x => (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : false).length>0
      });
      
      return resultFilter;
    }

    return result;
  }

  filterStatusUser(){
    var resultFilter = this.partners.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'status_user_id' && this.status_user_id == i[x]) || this.status_user_id == 0) ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  async showModal(partner: IPartner){
    this.currentPartner = partner.id;
    this.currentInUse = false;
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'ATIVAR';  
    this.title = 'Confirma a ativação do ' + this.module;
  }

  showModalReason(partner: IPartner){
    this.currentPartner = partner.id;
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'BLOQUEAR';
    this.title = 'Preencha o Motivo';
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

  async showModalBank(partner: any){
    let response = await this.partnerBankService.getByUser(partner.id).toPromise();
    this.currentBank = response[0];
    this.title = partner.first_name + ' ' + partner.last_name;
  }

  async showModalStore(store: any){
    this.currentStore = store;
    this.title = '';
  }


  async activePartner(id: number) {
    (await this.partnerService.activePartner(id)).toPromise();
    this.listPartners();
  }

  confirm(confirm: boolean){
    if(confirm){
      this.activePartner(this.currentPartner);
    }
  }

  async confirmReason(confirm: boolean){
    if(confirm){
      
    }
  }

}