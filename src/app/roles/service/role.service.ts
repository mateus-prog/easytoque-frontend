import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRole } from 'src/app/roles/IRole';
import { AuthenticationService } from '../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/roles`;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IRole[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IRole>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}