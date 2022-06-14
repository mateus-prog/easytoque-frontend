import { Component, OnInit } from '@angular/core';
//import  version  from '../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  constructor() { }

  appVersion: any;

  ngOnInit(): void {
    //this.appVersion = version.version;
    this.appVersion = '1.0.0';
  }

}
