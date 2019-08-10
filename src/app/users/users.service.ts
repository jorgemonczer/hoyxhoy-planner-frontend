import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = './api/users';

  constructor(public http: HttpClient) {
  }

  getUsers() : Observable<User[]>{
    return this.http.get(this.baseUrl) as Observable<User[]>;
  }

  getUserByUsername(username : string): Observable<User> {
    return this.http.get(`${this.baseUrl}/${username}`) as Observable<User>;
  }

  addUser(user: User): Observable<User>  {
      return this.http.post(this.baseUrl, user)  as Observable<User>;
  }

  deleteUserByUsername(username: string) : Observable<User> {
    return this.http.delete(`${this.baseUrl}/${username}`)  as Observable<User>;
  }

  updateUser(user : User): Observable<User> {
    return this.http.put(`${this.baseUrl}/${user.username}`, user) as Observable<User>;
  }

}
