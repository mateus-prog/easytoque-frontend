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

    uploadProof(request: any) {
        return this.httpClient.post<IRequestUpload>(`${baseUrl}/upload/proof`, request, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    uploadInvoice(formData: any) {
        return this.httpClient.post<IRequestUpload>(`${baseUrl}/upload/invoice`, formData, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getRequestStore(type: string) {
        return this.httpClient.get<any>(`${baseUrl}/store/${type}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getClient() {
        return this.httpClient.get<any>(`${baseUrl}/client`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

}
