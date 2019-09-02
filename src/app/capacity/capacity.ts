import { User } from '../users/user';
import { Spring } from '../springs/spirng';

export class Capacity {
    
    id : number;
    spring : Spring;
    user : User;
    availableHours : number

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
