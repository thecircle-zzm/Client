import { Injectable } from "@angular/core";
import { AlertService } from './alert.service';

@Injectable()
export class CertificateService {
    crypto = window.crypto;

    constructor(private Alerts:AlertService) {}

    convertStringToArrayBufferView(str)
    {
        var bytes = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++)
        {
            bytes[i] = str.charCodeAt(i);
        }

        return bytes;
    } 

    str2ab(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    
    importKey(pem){
        // fetch the part of the PEM string between header and footer
        const pemHeader = "-----BEGIN RSA PRIVATE KEY-----";
        const pemFooter = "-----END RSA PRIVATE KEY-----";
        const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
        // base64 decode the string to get the binary data
        const binaryDerString = atob(pemContents);
        // convert from a binary string to an ArrayBuffer
        const binaryDer = this.str2ab(binaryDerString);


        return window.crypto.subtle.importKey(
            "pkcs8",
            binaryDer,
            {
                name: "RSA-PSS",
                // Consider using a 4096-bit key for systems that require long-term security
                hash: "SHA-256"
            },
            true,
            ["sign"]
        );
    }  

    sign(data: string){
        let session = JSON.parse(sessionStorage.getItem('user'));

        this.importKey(session.key).then((key) => {
            console.log(key);
            return this.crypto.subtle.sign("RSASSA-PKCS1-v1_5", key , this.convertStringToArrayBufferView(data));  
        }), (err) => {
            console.log(err);
        };
    }
}