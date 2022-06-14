import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMenu } from 'src/app/template/sidebar/IMenu';
import { AuthenticationService } from '../../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/menus`;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IMenu[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getByRoleId(roleId: number) {
        return this.httpClient.get<IMenu[]>(`${baseUrl}/${roleId}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IMenu>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}