import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IState } from 'src/app/states/IState';
import { AuthenticationService } from '../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/states`;

@Injectable({
  providedIn: 'root'
})
export class StateService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IState[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByName(name: string) {
        return this.httpClient.get<IState>(`${baseUrl}/uf/${name}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}