import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogo } from 'src/app/logos/ILogo';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/logos`;

@Injectable({
  providedIn: 'root'
})
export class LogoService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getByUser() {
        return this.httpClient.get<ILogo>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(formData: any) {
        return this.httpClient.post(`${baseUrl}/updateLogo`, formData, {
            headers: this.auth.getAuthorizationHeader()
        });    
    }

    /*update(id: number, formData: any) {
        return this.httpClient.put(`${baseUrl}/updateLogo/${id}`, formData, {
            headers: this.auth.getAuthorizationHeader()
        });    
    }*/
    
    delete() {
        return this.httpClient.delete<void>(`${baseUrl}/deleteLogo`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}