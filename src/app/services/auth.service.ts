import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgxIndexedDB } from 'ngx-indexed-db';
import 'rxjs/add/operator/map';
import { CertificateService } from './certificate.service';

declare var KJUR: any;

// import { UserService } from './user.service';

// import { User } from '../models/user';
// import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class AuthenticationService {
  
  constructor(
    private http: HttpClient,
    private certificateService: CertificateService
    ) { }

  login(username: string, key: string) {
    sessionStorage.setItem('user', JSON.stringify({username: username, key: key}))

    let signature = this.sign(username);
    console.log("signature: "+ signature)
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
  }

  sign(plaintext: string): string {
    let session = JSON.parse(sessionStorage.getItem('user'));
    var sig = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
    sig.init(session.key);
    sig.updateString(plaintext);
    var hSigVal = sig.sign();
    return hSigVal;
  }
}