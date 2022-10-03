import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilityService {

    constructor(public datepipe: DatePipe) {}

    formatDateToServer(value: string) {
        if (!value) {
            return '';
        }

        let data = value.split('/');
        return data[2] + '-' + data[1] + '-' + data[0]; //YYYY-MM-DD
    }

    formatDateToStringServer(value: Date){
        if (!value) {
            return '';
        }

        return this.datepipe.transform(value, 'yyyy-MM-dd');
    }
}