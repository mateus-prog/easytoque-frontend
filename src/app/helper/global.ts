export function getValueComission(value: any, requests: any): any{
    value = value.replace('.', '');
    value = value.replace(',', '.');
    let withdrawalsMade: number = 0;

    requests.forEach((element: any) => {      
      if(element.value != 'undefined' && element.value != undefined
      && element.status_request_id != 1 && element.status_request_id != 3){
        element.value = element.value.replace('R$ ', ''); 
        element.value = element.value.replace('.', ''); 
        element.value = element.value.replace(',', '.'); 
        withdrawalsMade += parseFloat(element.value);
      }
    });

    return value - withdrawalsMade;
}

export function getStatusWaiting(requests: any): any{
    let count: number = 0;

    requests.forEach((element: any) => {      
      if(element.status_request_id == 1){
        count++;
      }
    });

    return count;
}

export function toDate(texto: any): Date {
  let partes = texto.split('/');
  return new Date(partes[2], partes[1]-1, partes[0]);
}

export function toString(date: Date): string {
  return ('0' + date.getDate()).slice(-2) + '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
    date.getFullYear();
}

export function transformToDate(texto: any): string {
  let partes = texto.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}