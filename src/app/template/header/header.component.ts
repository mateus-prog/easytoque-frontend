import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id!: string;
  typeUser!: number;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.getUserId();
    this.typeUser = parseInt(this.getRole());
  }
  
  getUserId() {
    return this.authenticationService.getUserId();
  }

  getRole(){
    return this.authenticationService.getRoleId()
  }

  logoff() {
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }

}
