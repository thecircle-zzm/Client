import { Component, OnInit } from '@angular/core';
import { CertificateService } from './services/certificate.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClientCircle';

  constructor(private service:CertificateService){

  }

  ngOnInit() {
    let test = "Hello"
    let test2 = "Hello you"
    this.service.createCertificate().then((key)=>{
      this.service.encrypt(test, key.privateKey).then((certificate)=>{
        this.service.exportKey(key.publicKey).then((x)=>{
          console.log(x)
        })
        sessionStorage.setItem("Certificate",String.fromCharCode.apply(certificate))
        this.service.verifySignature(test,key.publicKey,certificate).then((verified)=>{
          console.log(verified);
        })
      })
    })
  }
}
