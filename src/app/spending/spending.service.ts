import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Asignment } from '../asignment/asignment';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
  private _baseUrl = './api/springs/';

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getSpendings() : Observable<Asignment[]>{
    return this.http.get(this.baseUrl) as Observable<Asignment[]>;
  }

  saveSpendings(asignments : Asignment[]): Observable<Asignment> {
    return this.http.put(`${this.baseUrl}/spendings`, asignments) as Observable<Asignment>;
  }

  private get baseUrl(): string {
    return this._baseUrl + this.loginService.currentSpringId + '/asignments';
  }

}
