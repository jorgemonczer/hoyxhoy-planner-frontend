import { AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { Directive } from "@angular/core";
import { Day_of_week } from "./date.model";

function noWeekend(c:AbstractControl) {
    if (c.value == null) return null;
    let day = new Date(c.value).getDay();
    if (day == Day_of_week.Saturday || day == Day_of_week.Sunday ) {
        return {weekend: true};
    }
    return null;
}

@Directive({
    selector: '[no-weekend]',
    providers: [
        {provide: NG_VALIDATORS, multi: true, useValue: noWeekend }
    ]
})
export class NoWeekendValidator { }