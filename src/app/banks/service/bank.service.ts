import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBank } from 'src/app/banks/IBank';

const baseUrl = `${environment.API_PATH}/banks`;

@Injectable({
  providedIn: 'root'
})
export class BankService {

    constructor( private httpClient: HttpClient ) { }

    getAll() {
        return this.httpClient.get<IBank[]>(baseUrl);
    }

    getById(id: number) {
        return this.httpClient.get<IBank>(`${baseUrl}/${id}`);
    }
}