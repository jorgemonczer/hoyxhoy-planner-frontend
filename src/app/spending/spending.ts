import { User } from '../users/user';
import { Feature } from '../backlog/feature';

export class Spending {
    
    spent : number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
