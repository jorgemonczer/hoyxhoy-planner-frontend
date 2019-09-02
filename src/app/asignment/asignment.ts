import { User } from '../users/user';
import { Feature } from '../backlog/feature';

export class Asignment {
    
    id : number;
    feature : Feature;
    user : User;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
