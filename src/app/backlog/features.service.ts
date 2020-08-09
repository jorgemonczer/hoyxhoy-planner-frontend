import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feature } from './feature';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private currentProjectId = "";
  private _baseUrl = './api/projects/';

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getFeatures() : Observable<Feature[]>{
    return this.http.get(this.baseUrl) as Observable<Feature[]>;
  }

  getFeatureById(id : number): Observable<Feature> {
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Feature>;
  }

  getFeaturesToAsign() : Observable<Feature[]>{
    return this.http.get(this.baseUrl+"/toAsign") as Observable<Feature[]>;
  }

  addFeature(feature: Feature): Observable<Feature>  {
      return this.http.post(this.baseUrl, feature)  as Observable<Feature>;
  }

  deleteFeatureById(id: number) : Observable<Feature> {
    return this.http.delete(`${this.baseUrl}/${id}`)  as Observable<Feature>;
  }

  updateFeature(feature : Feature): Observable<Feature> {
    return this.http.put(`${this.baseUrl}/${feature.id}`, feature) as Observable<Feature>;
  }

  private get baseUrl(): string {
    return this._baseUrl + this.loginService.currentProjectId + '/features';
  }

}
