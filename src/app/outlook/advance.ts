import { DateModel } from "../shared/date.model";

export class Advance {
    
    code : string = '';
    name : string = '';
    spent : number;
    advance : number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
