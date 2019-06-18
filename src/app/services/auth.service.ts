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
    console.log(key)
    this.certificateService.importKey(key).then((key)=>{
      this.certificateService.encrypt("{username:"+username+"}",key).then((signature)=>{
        this.http.post("localhost:51127/api","{username:"+username+"}",{headers:{signature:String.fromCharCode.apply(signature)}})
      });
    },(reason)=>{
      console.log("No import" + reason)
    })
    sessionStorage.setItem('user', JSON.stringify({username: username, key: key}))
    console.log(sessionStorage.getItem('user'));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
  }
}