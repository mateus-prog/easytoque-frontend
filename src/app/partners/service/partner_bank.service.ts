import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPartnerBank } from 'src/app/partners/IPartnerBank';
import { AuthenticationService } from '../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/users/bank`;

@Injectable({
  providedIn: 'root'
})
export class PartnerBankService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IPartnerBank[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByUser(user_id: number) {
        return this.httpClient.get<IPartnerBank[]>(`${baseUrl}/${user_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IPartnerBank>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(partner: IPartnerBank) {
        return this.httpClient.post<IPartnerBank>(baseUrl, partner, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    update(id: number, partner: IPartnerBank) {
        return this.httpClient.put<IPartnerBank>(`${baseUrl}/${id}`, partner, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
