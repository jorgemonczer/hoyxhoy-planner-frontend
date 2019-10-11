import { User } from '../users/user';
import { Feature } from '../backlog/feature';
import { Spending } from '../spending/spending';

export class Asignment {
    
    public id : number;
    public feature : Feature;
    public user : User;
    public spendingsInt : number[] = [];
    public spending: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.calculateSumSpending();
    }

    addSpendings(length: number) : Asignment  {
        for (let index = 0; index < length; index++) {
            this.spendingsInt[index] = null;
        }
        return this;
    }

    calculateSumSpending() {
        let numOr0 = (n: number) => isNaN(n) ? 0 : n;
        this.spending = this.spendingsInt.reduce((a,b) => numOr0(a) + numOr0(b));
    }

}
