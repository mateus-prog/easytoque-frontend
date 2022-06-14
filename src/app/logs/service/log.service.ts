import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILog } from 'src/app/logs/ILog';
import { AuthenticationService } from '../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/logs`;

@Injectable({
  providedIn: 'root'
})
export class LogService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<ILog[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
