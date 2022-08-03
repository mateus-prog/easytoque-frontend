import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPartnerCorporate } from 'src/app/partners/IPartnerCorporate';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/users/corporate`;

@Injectable({
  providedIn: 'root'
})
export class PartnerCorporateService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IPartnerCorporate[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByUser(user_id: number) {
        return this.httpClient.get<IPartnerCorporate[]>(`${baseUrl}/${user_id}`);
    }

    getByHash(hash_id: string) {
        return this.httpClient.get<IPartnerCorporate[]>(`${baseUrl}/${hash_id}/edit`);
    }
    
    getById(id: number) {
        return this.httpClient.get<IPartnerCorporate>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(partner: IPartnerCorporate) {
        return this.httpClient.post<IPartnerCorporate>(baseUrl, partner, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    update(id: number, partner: IPartnerCorporate) {
        return this.httpClient.put<IPartnerCorporate>(`${baseUrl}/${id}`, partner, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
