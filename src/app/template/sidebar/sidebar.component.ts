import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MenuService } from 'src/app/template/sidebar/service/menu.service';
import { IMenu } from 'src/app/template/sidebar/IMenu';

import { AuthenticationService } from 'src/service/authentication/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menus!: IMenu[];

  constructor(
    private authenticationService:AuthenticationService,
    private menuService: MenuService
  ) { }

  async ngOnInit(){
    let roleId = parseInt(this.authenticationService.getRoleId());
    this.menus = await this.menuService.getByRoleId(roleId)
      .pipe(first())
      .toPromise();
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

}
