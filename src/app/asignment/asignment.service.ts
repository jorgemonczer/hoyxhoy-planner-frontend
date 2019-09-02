import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Asignment } from './asignment';

@Injectable({
  providedIn: 'root'
})
export class AsignmentService {
  private _baseUrl = './api/springs/';

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getAsignments() : Observable<Asignment[]>{
    return this.http.get(this.baseUrl) as Observable<Asignment[]>;
  }

  getAsignmentById(id : number): Observable<Asignment> {
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Asignment>;
  }

  addAsignment(asignment: Asignment): Observable<Asignment>  {
      return this.http.post(this.baseUrl, asignment)  as Observable<Asignment>;
  }

  deleteAsignmentById(id: number) : Observable<Asignment> {
    return this.http.delete(`${this.baseUrl}/${id}`)  as Observable<Asignment>;
  }

  updateAsignment(asignment : Asignment): Observable<Asignment> {
    return this.http.put(`${this.baseUrl}/${asignment.id}`, asignment) as Observable<Asignment>;
  }

  private get baseUrl(): string {
    return this._baseUrl + this.loginService.currentSpringId + '/asignments';
  }

}
