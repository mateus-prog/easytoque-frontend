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