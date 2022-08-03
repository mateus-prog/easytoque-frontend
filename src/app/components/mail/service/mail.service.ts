import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMail } from 'src/app/components/mail/IMail';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/mails`;

@Injectable({
  providedIn: 'root'
})
export class MailService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    sendMail(mailRecipient: string, mailSubject: string, mailBody: string) {
        return this.httpClient.post<IMail>(`${baseUrl}/send-mail`, {mailRecipient, mailSubject, mailBody}, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
