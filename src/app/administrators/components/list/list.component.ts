import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IAdministrator } from 'src/app/administrators/IAdministrator';

import { AdministratorService } from 'src/app/administrators/service/administrator.service';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  currentAdministrator: any;
  currentInUse: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';
  messageModal: string = '';
  filter: string = '';

  administrators!: IAdministrator[];
  administrators2!: IAdministrator[];
  administrators3!: IAdministrator[];

  module: string = 'Administrador';
  breadcrumbModule: string = this.module+'es';
  breadcrumbAction: string = 'Listar';

  constructor(
    private authenticationService: AuthenticationService,
    private administratorService: AdministratorService
  ) { }

  async ngOnInit(){
    this.administrators = await this.administratorService.getByRole(1).toPromise();
    this.administrators2 = await this.administratorService.getByRole(2).toPromise();
    this.administrators3 = await this.administratorService.getByRole(3).toPromise();

    this.administrators = this.administrators.concat(this.administrators2, this.administrators3);
  }

  administratorsFilter() {
    if (this.filter.length >= 2) {
      var resultFilter = this.administrators.filter((i: any) => {
        return Object.keys(i).filter(x => (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : false).length>0
      });
      
      return resultFilter;
    }

    return this.administrators;
  }

  showModal(administrator: IAdministrator){
    this.currentAdministrator = administrator.email;
    this.currentInUse = false;
    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'BLOQUEAR';
    this.title = 'Confirma bloqueio do ' + this.module;
  }

  deleteAdministrator(id: number) {
    this.administratorService.delete(id)
      .pipe(first())
      .subscribe(() => this.administrators = this.administrators.filter(x => x.id !== id));
  }

  confirm(confirm: boolean){
    if(confirm){
      this.deleteAdministrator(this.currentAdministrator);
    }
  }

}