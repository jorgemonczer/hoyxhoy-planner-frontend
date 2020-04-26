import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from './holiday';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private baseUrl = './api/holidays';

  constructor(public http: HttpClient) {
  }

  getHolidays() : Observable<Holiday[]>{
    return this.http.get(this.baseUrl) as Observable<Holiday[]>;
  }

  getHolidayByDate(date : Date): Observable<Holiday> {
    return this.http.get(`${this.baseUrl}/${date}`) as Observable<Holiday>;
  }

  addHoliday(holiday: Holiday): Observable<Holiday>  {
      return this.http.post(this.baseUrl, holiday)  as Observable<Holiday>;
  }

  addHolidaysForYears(holiday: Holiday,years: number): Observable<Holiday>  {
    return this.http.post(`${this.baseUrl}/${years}`, holiday)  as Observable<Holiday>;
  }

  deleteHolidayByDate(date: Date) : Observable<Holiday> {
    return this.http.delete(`${this.baseUrl}/${date}`)  as Observable<Holiday>;
  }

  updateHoliday(holiday : Holiday): Observable<Holiday> {
    return this.http.put(`${this.baseUrl}/${holiday.date}`, holiday) as Observable<Holiday>;
  }

}
