import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdministrator } from 'src/app/administrators/IAdministrator';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/users`;

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IAdministrator[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByRole(role_id: number) {
        return this.httpClient.get<IAdministrator[]>(`${baseUrl}/role/${role_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IAdministrator>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(administrator: IAdministrator) {
        return this.httpClient.post<IAdministrator>(baseUrl, administrator, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    update(id: number, administrator: IAdministrator) {
        return this.httpClient.put<IAdministrator>(`${baseUrl}/${id}`, administrator, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
