import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAction } from 'src/app/actions/IAction';

const baseUrl = `${environment.API_PATH}/actions`;

@Injectable({
  providedIn: 'root'
})

export class ActionService {

    constructor( private httpClient: HttpClient ) { }

    getAll() {
        return this.httpClient.get<IAction[]>(baseUrl);
    }

    getById(id: number) {
        return this.httpClient.get<IAction>(`${baseUrl}/${id}`);
    }
}