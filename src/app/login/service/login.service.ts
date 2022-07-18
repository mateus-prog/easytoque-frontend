import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { IAuth } from 'src/app/login/LoginInterfaces';

const baseUrl = `${environment.API_PATH}/auth`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${baseUrl}/login`, {email,password}).toPromise();
  }

  forgotPassword(login:string, access_token:string) {
    return this.httpClient.post<boolean>(`${baseUrl}/password/forgot`, {login,access_token});
  }

  async changeForgottenPassword(password: string, repeatPassword: string, access_token: string) {
    return this.httpClient.post(`${baseUrl}/password/reset`, {password, repeatPassword, access_token});
  }

  changePassword(password: string) {
    return this.httpClient.post(`${baseUrl}/password/change`, {password}, {
      headers: this.auth.getAuthorizationHeader()
    });
  }

}
