import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgxIndexedDB } from 'ngx-indexed-db';
import 'rxjs/add/operator/map';
import { CertificateService } from './certificate.service';

// import { UserService } from './user.service';

// import { User } from '../models/user';
// import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class AuthenticationService {
  // private users: User[];
  
  constructor(
    private http: HttpClient,
    private certificateService: CertificateService
    // private userService: UserService
    ) { }

  login(username: string, key: string) {
    sessionStorage.setItem('user', JSON.stringify({username: username, key: key}))

    let test = "Hello"
    let signature = this.certificateService.sign(test);
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
  }
}