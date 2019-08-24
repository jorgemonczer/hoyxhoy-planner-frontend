import { DateModel } from "../shared/date.model";

export class Spring {
    
    id : number;
    code : string = '';
    name : string = '';
//    status : string = '';
    springDays : number;
    startDate : string;
    endDate: string;

    startDateMd : DateModel;
    endDateMd : DateModel;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.startDateMd = new DateModel(this.startDate);
        this.endDateMd = new DateModel(this.endDate);
    }

    applyChanges() {
        this.startDate = this.startDateMd.value;
        this.endDate = this.endDateMd.value;
    }

    setEndDateMdCalculed() {
        this.endDateMd.setAddWorkableDays(this.startDateMd,this.springDays);
    }

    isNeededPropagate() : boolean {
        return !this.endDateMd.equalsThan(this.endDate);
    }

}
