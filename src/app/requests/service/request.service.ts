import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequest } from 'src/app/requests/IRequest';
import { AuthenticationService } from '../../../service/authentication/authentication.service';

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
}
