export class User {
    
    username : string;
    password : string = '';
    name : string;
    email : string = '';
    phone : string = '';
    mobile: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
