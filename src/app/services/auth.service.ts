import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';

import { UserService } from './user.service';

import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  private users: User[];

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  login(username: string, password: string) {
    // return this.http.post<any>('/api/authenticate', { username: username, password: password })

    // .map(user => {
    //   // login successful if there's a jwt token in the response
    //   if (user && user.token) {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //   }
    //   return user;
    // });

    return this.userService.getAll().map((users) => {
      users.forEach((user) => {
        if (user.username == username && user.password == password){
          localStorage.setItem('currentUser', JSON.stringify(user));
          return of(user);
        }
      })
    })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}