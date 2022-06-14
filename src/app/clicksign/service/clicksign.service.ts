import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISigner } from 'src/app/clicksign/ISigner';
import { IDocumentTemplate } from 'src/app/clicksign/IDocumentTemplate';
import { ISignerDocument } from 'src/app/clicksign/ISignerDocument';
import { INotificationEmail } from 'src/app/clicksign/INotificationEmail';

import { AuthenticationService } from '../../../service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/clickSign`;

@Injectable({
  providedIn: 'root'
})
export class ClickSignService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    createSigner(user_id: number){
        return this.httpClient.get<ISigner>(`${baseUrl}/createSigner/${user_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    createDocumentTemplate(user_id: number){
        return this.httpClient.get<IDocumentTemplate>(`${baseUrl}/createDocumentTemplate/${user_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    createSignerDocument(user_id: number){
        return this.httpClient.get<ISignerDocument>(`${baseUrl}/createSignerDocument/${user_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    notificationEmail(user_id: number){
        return this.httpClient.get<INotificationEmail>(`${baseUrl}/notificationEmail/${user_id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
