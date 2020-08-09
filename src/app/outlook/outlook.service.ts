import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { Advance } from './advance';

@Injectable({
  providedIn: 'root'
})
export class OutlookService {
  private currentProjectId = "";
  private _baseUrl = './api/projects/';
  
  constructor(private http: HttpClient, private loginService: LoginService) {
  }
  
  public getAdvance(): Observable<Advance[]> {
    return this.http.get(this.baseUrl) as Observable<Advance[]>;
  }

  private get baseUrl(): string {
    return this._baseUrl + this.loginService.currentProjectId + '/q_spring';
  }

}
