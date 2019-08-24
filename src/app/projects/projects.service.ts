import { Injectable } from '@angular/core';
import { Project } from './project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = './api/projects';

  constructor(private http: HttpClient) {
  }

  getProjects() : Observable<Project[]>{
    return this.http.get(this.baseUrl) as Observable<Project[]>;
  }

  getProjectById(id : number): Observable<Project> {
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Project>;
  }

  addProject(project: Project): Observable<Project>  {
      return this.http.post(this.baseUrl, project)  as Observable<Project>;
  }

  deleteProjectById(id: number) : Observable<Project> {
    return this.http.delete(`${this.baseUrl}/${id}`)  as Observable<Project>;
  }

  updateProject(project : Project): Observable<Project> {
    return this.http.put(`${this.baseUrl}/${project.id}`, project) as Observable<Project>;
  }

}
