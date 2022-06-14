import { Component, OnInit } from '@angular/core';
import { IAdministrator } from 'src/app/administrators/IAdministrator';

import { AlertService } from 'src/app/components/alert/service/alert.service';
import { LogService } from 'src/app/logs/service/log.service';
import { AdministratorService } from 'src/app/administrators/service/administrator.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  action: string = '';
  user_id: number = 0;

  logs!: any;

  administrators!: IAdministrator[];
  administrators2!: IAdministrator[];
  administrators3!: IAdministrator[];

  module: string = 'Log';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private logService: LogService,
    private administratorService: AdministratorService,
    private alertService: AlertService,
  ) { }

  async ngOnInit(){
    this.logs = await this.logService.getAll().toPromise();

    this.administrators = await this.administratorService.getByRole(1).toPromise();
    this.administrators2 = await this.administratorService.getByRole(2).toPromise();
    this.administrators3 = await this.administratorService.getByRole(3).toPromise();

    this.administrators = this.administrators.concat(this.administrators2, this.administrators3);
  }

  filterLog() {
    if (this.action.length >= 2) {
      var a = this.filterAction();
      var b = this.filterUser(a);
      return b;
    }else{
      return this.filterUser(this.logs);
    }
  }

  filterUser(a: any){
    var b = a.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'user_id' && this.user_id == i[x]) || this.user_id == 0) ? true : false
      ).length > 0
    });
    
    return b;
  }

  filterAction(){
    var a = this.logs.filter((i: any) => {
      return Object.keys(i).filter(x => 
        (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.action.toLowerCase()) >= 0 : false
      ).length > 0
    });
    
    return a;
  }
}