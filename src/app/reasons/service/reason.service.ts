import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReason } from 'src/app/reasons/IReason';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/reasons`;

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IReason[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IReason>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(reason: any) {
        return this.httpClient.post<IReason>(baseUrl, reason, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
