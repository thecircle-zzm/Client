import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { USERS } from '../mock/users.mock';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  users: User[] = USERS;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return of (this.users);
  }

  
  getById(id: number) {
    return of (this.users.find(x => x.id == id));
  }
}