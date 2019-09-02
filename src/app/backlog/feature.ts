export class Feature {
    
    id : number;
    code : string;
    title : string = '';
    status : string = '';
    estimatedHours : number = 0;
    committedDate: Date = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
