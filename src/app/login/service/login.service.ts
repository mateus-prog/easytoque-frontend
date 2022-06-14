import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { IAuth } from 'src/app/login/LoginInterfaces';

const baseUrl = `${environment.API_PATH}/auth/login`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>(baseUrl, {email,password}).toPromise();
  }

  getUser(cpf: string) {
    return this.httpClient.get<any>(`${baseUrl}/${cpf}`);
  }

  create(user: any) {
    return this.httpClient.post<void>(`${baseUrl}/new`, user);
  }

  forgotPassword(login:string, access_token:string) {
    return this.httpClient.post<boolean>(`${baseUrl}/password/forgot`, {login,access_token});
  }

  async changeForgottenPassword(password: string, repeatPassword: string, access_token: string) {
    return this.httpClient.post(`${baseUrl}/password/reset`, {password, repeatPassword, access_token});
  }

  async changePassword(password: string, repeatPassword: string) {
    return this.httpClient.post(`${baseUrl}/password/change`, {password, repeatPassword}, {
      headers: this.auth.getAuthorizationHeader()
    });
  }

}
