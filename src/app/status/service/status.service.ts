import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStatus } from 'src/app/status/IStatus';

const baseUrl = `${environment.API_PATH}/status`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get<IStatus[]>(baseUrl);
    }

    getById(id: number) {
        return this.httpClient.get<IStatus>(`${baseUrl}/id`);
    }
}