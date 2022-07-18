import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { IAuth } from 'src/app/login/LoginInterfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private sessionStorage: SessionStorageService
  ) { }

  isLoggedIn() {
      return this.sessionStorage.getItem('token')!=null && this.sessionStorage.getItem('token')!='null';
  }

  getName() {
    return this.sessionStorage.getItem('first_name');
  }

  updateName(name: string) {
    this.sessionStorage.setItem('first_name', name);
  }

  getEmail() {
    return this.sessionStorage.getItem('email');
  }

  getRoleId() {
    return this.sessionStorage.getItem('roleId');
  }

  getStatusUserId() {
    return this.sessionStorage.getItem('statusUserId');
  }

  getUserId() {
    return this.sessionStorage.getItem('id');
  }

  getUserHashId() {
    return this.sessionStorage.getItem('hash_id');
  }

  logout() {
    this.sessionStorage.removeItem('token');
    this.sessionStorage.removeItem('first_name');
    this.sessionStorage.removeItem('email');
    this.sessionStorage.removeItem('roleId');
    this.sessionStorage.removeItem('statusUserId');
    this.sessionStorage.removeItem('id');
    this.sessionStorage.removeItem('hash_id');
  }

  login(data: IAuth) {
    this.sessionStorage.setItem('id', data.user.id);
    this.sessionStorage.setItem('first_name', data.user.first_name);
    this.sessionStorage.setItem('statusUserId', data.user.status_user_id);
    this.sessionStorage.setItem('roleId', data.user.role_id);
    this.sessionStorage.setItem('email', data.user.email);
    this.sessionStorage.setItem('token', data.token);
    this.sessionStorage.setItem('hash_id', data.user.hash_id);
  }

  getAuthorizationHeader() {
    return {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')};
  }
}
