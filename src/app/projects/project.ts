export class Project {
    
    id : string; 
    code : string = '';
    name : string = '';
    startDate : Date;
    springDays : number;
//    status: string = '';
//    backlog: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
