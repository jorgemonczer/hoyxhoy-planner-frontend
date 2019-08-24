import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../projects/project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from './loginUser';
import { Spring } from '../springs/spirng';
import { User } from '../users/user';

@Injectable()
export class LoginService {

  private userState: User = null;
  private projectState: Project = null;
  private springState: Spring = null;
 
  //public loginUserObs: Observable<LoginUser[]>;
  private baseUrl = './api/login';

  constructor(public http: HttpClient) {
  }
 
  get isUserAnonymousLoggedIn(): boolean {
    return false;
  }
 
  get currentUserName(): string {
    return this.userState !== null ? this.userState.username : 'Usuario Anónimo';
  }

  get currentName(): string {
    return this.userState !== null ? this.userState.name : 'Usuario Anónimo';
  }
  
  get currentUser(): User {
    return (this.userState !== null) ? this.userState : null;
  }

  set currentUser(user: User) {
    this.userState = user;
  }

  get currentProject() : Project {
    return (this.projectState !== null) ? this.projectState : null;
  }

  set currentProject( project : Project) {
    this.projectState = project;
  }

  get currentProjectId() : number {
    return (this.projectState !== null) ? this.projectState.id : NaN;
  }

  get currentProjectName() : string {
    return (this.projectState !== null) ? this.projectState.code + ' - ' + this.projectState.name : 'Select a project';
  }

  get currentSpring() : Spring {
    return (this.springState !== null) ? this.springState : null;
  }

  set currentSpring( spring : Spring) {
    this.springState = spring;
  }

  get currentSpringName() : string {
    return '& ' + ((this.springState !== null) ? this.springState.code + ' - ' + this.springState.name : 'Select a spring');
  }

  public get isUserLoggedIn(): boolean {
//    if ((this.userState !== null) && (!this.isUserAnonymousLoggedIn)) {
    return (this.userState != null)
  }
 
//  public createUserWithEmail(email: string, password: string) :Promise<any> {
//    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
//  }
 
  public loginWithUsername(username: string, password: string) {
    return this.http.put(`${this.baseUrl}/${username}`, password) as Observable<User>;
  }
 
  public signOut(): void {
       this.userState = null;
//     this.http.get(`${this.baseUrl}/login/singout/${this.userState.username}`);
  }

}
