import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Capacity } from './capacity';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  private _baseUrl = './api/springs/';

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getCapacities() : Observable<Capacity[]>{
    return this.http.get(this.baseUrl) as Observable<Capacity[]>;
  }

  getCapacityById(id : number): Observable<Capacity> {
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Capacity>;
  }

  addCapacity(capacity: Capacity): Observable<Capacity>  {
      return this.http.post(this.baseUrl, capacity)  as Observable<Capacity>;
  }

  deleteCapacityById(id: number) : Observable<Capacity> {
    return this.http.delete(`${this.baseUrl}/${id}`)  as Observable<Capacity>;
  }

  updateCapacity(capacity : Capacity): Observable<Capacity> {
    return this.http.put(`${this.baseUrl}/${capacity.id}`, capacity) as Observable<Capacity>;
  }

  private get baseUrl(): string {
    return this._baseUrl + this.loginService.currentSpringId + '/capacities';
  }

}
