import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Spring } from './spirng';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpringsService {
  private currentProjectId = "";
  private _baseUrl = './api/projects/';
  
  constructor(private http: HttpClient, private loginService: LoginService) {
  }
  
  public getSprings(): Observable<Spring[]> {
    return this.http.get(this.baseUrl) as Observable<Spring[]>;
    ;
  }
  
  public getSpringById(id: number): Observable<Spring> {
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Spring>;
  }
  
  public addSpring(spring: Spring): Observable<Spring> {
    return this.http.post(this.baseUrl, spring) as Observable<Spring>;
    ;
  }
  
  public deleteSpringById(id: number): Observable<Spring> {
    return this.http.delete(`${this.baseUrl}/${id}`) as Observable<Spring>;
  }
  
  public updateSpring(spring: Spring): Observable<Spring> {
    return this.http.put(`${this.baseUrl}/${spring.id}`, spring) as Observable<Spring>;
  }
  
  public setSpringDefaultValues(spring: Spring = new Spring()): Spring {
    spring.springDays = this.loginService.currentProject.springDays;
    spring.startDateMd.value = this.loginService.currentProject.startDate.toString();
    spring.setEndDateMdCalculed();
    return spring;
  }
  
  public changeSpringDefaultValues(spring: Spring, rowData: Spring[]): Spring {
    spring = this.setSpringDefaultValues(spring);
    if (rowData) {
      rowData.forEach(s => {
        if (spring.startDateMd.lessThan(s.endDateMd)) {
          spring.startDateMd.setAddWorkableDays(s.endDateMd, 2);
          spring.setEndDateMdCalculed();
        }
      });
    }
    return spring;
  }
  
  private get baseUrl(): string {
    return this._baseUrl + this.loginService.currentProjectId + '/springs';
  }
}
