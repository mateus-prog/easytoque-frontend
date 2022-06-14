import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStatusRequest } from 'src/app/status-request/IStatusRequest';

const baseUrl = `${environment.API_PATH}/statusRequest`;

@Injectable({
  providedIn: 'root'
})
export class StatusRequestService {

    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get<IStatusRequest[]>(baseUrl);
    }

    getById(id: number) {
        return this.httpClient.get<IStatusRequest>(`${baseUrl}/${id}`);
    }
}