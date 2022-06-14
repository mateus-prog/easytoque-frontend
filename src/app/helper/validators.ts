import { AbstractControl } from '@angular/forms';

export class Validations {
  static validateCpf(control: AbstractControl) {
    const cpf = control.value;

    cpf.replace( /\D/g , ""); 

    var sum;
    var rest;
    sum = 0;
    if (cpf == "00000000000") {
        return false;
    }

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = sum % 11;

    rest = rest == 10 || rest == 11 || rest < 2 ? 0 : 11 - rest;

    if (rest != parseInt(cpf.substring(9, 10))) {
        return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = sum % 11;

    rest = rest == 10 || rest == 11 || rest < 2 ? 0 : 11 - rest;

    if (rest != parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
    
  }
}