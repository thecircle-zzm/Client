import { Injectable } from "@angular/core";
import { AlertService } from './alert.service';

@Injectable()
export class CertificateService {
    crypto = window.crypto;

    constructor(private Alerts:AlertService) {}

    private convertStringToArrayBufferView(str)
    {
        var bytes = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++)
        {
            bytes[i] = str.charCodeAt(i);
        }

        return bytes;
    }   

    encrypt(data: string, key){
        return this.crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, this.convertStringToArrayBufferView(data));
    }
}