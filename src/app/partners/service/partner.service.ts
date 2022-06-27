import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPartner } from 'src/app/partners/IPartner';
import { AuthenticationService } from '../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/users`;

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IPartner[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByRole(role_id: number) {
        return this.httpClient.get<IPartner[]>(`${baseUrl}/role/${role_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IPartner>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(partner: IPartner) {
        return this.httpClient.post<IPartner>(baseUrl, partner, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    update(id: number, partner: IPartner) {
        return this.httpClient.put<IPartner>(`${baseUrl}/${id}`, partner, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    blockOrUnlock(id: number) {
        return this.httpClient.put<IPartner>(`${baseUrl}/block/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getAddressByCep(cep: string) {
        return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
    }

    getDataByCNPJ(cnpj: string) {
        return this.httpClient.get<any>(`http://receitaws.com.br/v1/cnpj/${cnpj}`);
    }
}