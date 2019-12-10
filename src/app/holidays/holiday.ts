export class Holiday {
    
    date : Date = null;
    description : string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
