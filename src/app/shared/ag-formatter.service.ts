import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AgFormatterService {

    ag_dateFormatter(params: any): string {
       return new Date(params.value).toLocaleDateString(undefined,{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
    }
    
    ag_numberTwoDecimalFormatter(params: any) : string {
      if (params.value || params.value == 0) {
         return params.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
       }
       return params.value;
    }

    ag_percentageTwoDecimalFormatter(params: any) : string {
      if (params.value || params.value == 0) {
        let value = params.value * 100;
         return value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%"
       }
       return params.value;
    }

    setTwoNumberDecimal(event: any) {
      event.target.value = parseFloat(event.target.value).toFixed(2);
    }
    
    validateNumberTwoDecimal(event: any) {
      //let input = String.fromCharCode(e.charCode);
      let specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
      if (specialKeys.indexOf(event.key) !== -1) {
         return;
       }
   
      let input = event.srcElement.value
      let input2 = event.target.value
      const reg = new RegExp(/^\d+[.,]?\d{0,2}$/g);
  
//      if (!reg.test(input)) {
//        e.preventDefault();
//      }
   }

}