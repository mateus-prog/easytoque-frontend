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

    getByUser(user_id: number) {
        return this.httpClient.get<IPartnerCorporate[]>(`${baseUrl}/${user_id}`);
    }

    getByHash(hash_id: string) {
        return this.httpClient.get<IPartnerCorporate[]>(`${baseUrl}/${hash_id}/edit`);
    }
}
