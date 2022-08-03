import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequest } from 'src/app/requests/IRequest';
import { IRequestUpload } from 'src/app/requests/IRequestUpload';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/requests`;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IRequest[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: any) {
        return this.httpClient.get<IRequest>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByUser() {
        return this.httpClient.get<IRequest>(`${baseUrl}/user`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    update(id: number, request: any) {
        return this.httpClient.put<IRequest>(`${baseUrl}/${id}`, request, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    upload(id: any, request: any) {
        return this.httpClient.put<IRequestUpload>(`${baseUrl}/${id}`, request, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

}
