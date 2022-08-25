import { Component, OnInit } from '@angular/core';

import { IAdministrator } from 'src/app/administrators/IAdministrator';
import { IAction } from 'src/app/actions/IAction';

import { LogService } from 'src/app/logs/service/log.service';
import { AdministratorService } from 'src/app/administrators/service/administrator.service';
import { ActionService} from 'src/app/actions/service/action.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  status: string = '';
  user_changed_id: number = 0;
  action_id: string = '';
  action: string = '';
  user_modified_id: number = 0;

  logs!: any;

  administrators!: IAdministrator[];
  administrators2!: IAdministrator[];
  administrators3!: IAdministrator[];

  users!: IAdministrator[];
  actions!: IAction[];

  module: string = 'Log';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private logService: LogService,
    private administratorService: AdministratorService,
    private actionService: ActionService,
  ) { }

  async ngOnInit(){
    this.logs = await this.logService.getAll().toPromise();

    this.administrators = await this.administratorService.getByRole(1).toPromise();
    this.administrators2 = await this.administratorService.getByRole(2).toPromise();
    this.administrators3 = await this.administratorService.getByRole(3).toPromise();
    this.users = await this.administratorService.getAll().toPromise();

    this.actions = await this.actionService.getAll().toPromise();

    this.administrators = this.administrators.concat(this.administrators2, this.administrators3);
  }

  filterLog() {
    var a = this.filterActionByUser();
    var b = this.filterStatus(a);
    var c = this.filterAdministrator(b);
    var d = this.filterUser(c);
    var e = this.filterAction(d);

    return e.reverse();
  }

  filterStatus(result: any){
    var resultFilter = result.filter((i: any) => {
      return Object.keys(i).filter(x => 
        x == 'status' && ((this.status == 'sucesso' && i[x] == 1) || (this.status == 'erro' && i[x] == 0) || this.status == '')  ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterAdministrator(result: any){
    var resultFilter = result.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'user_changed_id' && this.user_changed_id == i[x]) || this.user_changed_id == 0) ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterUser(result: any){
    var resultFilter = result.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'user_modified_id' && this.user_modified_id == i[x]) || this.user_modified_id == 0) ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterAction(result: any){
    var resultFilter = result.filter((i: any) => {
      return Object.keys(i).filter(x => 
        ((x == 'action_id' && this.action_id == i[x]) || this.action_id == '') ? true : false
      ).length > 0
    });
    
    return resultFilter;
  }

  filterActionByUser(){
    if (this.action.length >= 2) {
      var resultFilter = this.logs.filter((i: any) => {
        return Object.keys(i).filter(x => 
          (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.action.toLowerCase()) >= 0 : false
        ).length > 0
      });
      
      return resultFilter;
    }

    return this.logs;
  }
}