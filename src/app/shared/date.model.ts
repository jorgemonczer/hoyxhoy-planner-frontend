export class DateModel {
    
    private _value : Date;

    constructor(val: string) {
        this._value =val && val.length > 0? new Date(val) : new Date();
    }

    get value() : string {
        return this.toString();
    }

    set value(val : string) {
        this._value =val && val.length > 0? new Date(val) : new Date();
    }

    public setDate(value : Date) {
        this._value = value;
    }

    public addDays(days :number) {
        this._value.setDate(this._value.getDate() + days);
    }

    public setAddDays(dateM : DateModel, days: number) {
        this._value = new Date(dateM._value);
        this.addDays(days);
    }

    public setAddWorkableDays(dateM : DateModel, days: number) {
        this._value = new Date(dateM._value);
        let wdays = this._value.getDay() + days - 1;
        let workableDays = days - 1 + Math.trunc(wdays/5)*2;
        this.addDays(workableDays);
    }

    public greaterThan(otherValue : string | Date | DateModel ) : boolean {
        return this._value > this.toDate(otherValue);
    }

    public greaterOrEqualsThan(otherValue : string | Date | DateModel ) : boolean {
        return this._value >= this.toDate(otherValue);
    }
    
    public lessThan(otherValue : string | Date | DateModel ) : boolean {
        return this._value < this.toDate(otherValue);
    }

    public equalsThan(otherValue : string | Date | DateModel ) : boolean {
        return this._value == this.toDate(otherValue);
    }

    public toDate(value : string | Date | DateModel ) : Date {
        let valueToDate:Date = null;
        if (typeof value === 'string') {
            valueToDate = new Date(value);
        } else if (value instanceof Date) {
            valueToDate = <Date>value;
        } else {
            valueToDate = (<DateModel>value)._value;
        }
        return valueToDate;
    }

    public toString() {
        return this._value.toISOString().split('T')[0];
    }

}

export enum Day_of_week {
    Monday,	
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday    
}
