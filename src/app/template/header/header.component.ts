import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { RequestService } from 'src/app/requests/service/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  clientId!: any;
  typeUser!: number;

  constructor(
    private authenticationService: AuthenticationService,
    private requestService: RequestService,
    private router: Router
  ) { }

  async ngOnInit(){
    this.clientId = await this.requestService.getClient().toPromise();
    this.typeUser = await parseInt(this.getRole());
  }
  
  getRole(){
    return this.authenticationService.getRoleId()
  }

  logoff() {
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }

}
