import { Injectable } from "@angular/core";
import { AlertService } from './alert.service';

@Injectable()
export class CertificateService {
    crypto = window.crypto;

    constructor(private Alerts:AlertService){

    }

    private convertStringToArrayBufferView(str)
    {
        var bytes = new Uint8Array(str.length);
        for (var iii = 0; iii < str.length; iii++)
        {
            bytes[iii] = str.charCodeAt(iii);
        }

        return bytes;
    }   

    createCertificate(){
        let promiseKey:PromiseLike<CryptoKeyPair> = null;
        let privateKey = null;
        let publicKey = null;
        
        if(this.crypto.subtle){
            promiseKey = crypto.subtle.generateKey({name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: {name: "SHA-256"}}, false, ["sign", "verify"]);
            promiseKey.then(function(key){
                privateKey = key.privateKey;
                publicKey = key.publicKey;
            },function(error){
                this.Alerts.notifyUser("BadCrypto")
            })
        } else {
            this.Alerts.notifyUser("NoCrypto")
        }
    }


    encrypt(data: string, privateKey){
        let encryptedPromise = this.crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, this.convertStringToArrayBufferView(data));

        encryptedPromise.then((signature) => {
            return signature;
        },(error)=>{
            this.Alerts.notifyUser("BadCrypto")
        })
    }

    verifySignature(data: string, publicKey, signature){
        let decryptedPromise = crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, signature, this.convertStringToArrayBufferView(data));
        decryptedPromise.then(
            (result) => {
                return result;
            },(error) => {
                this.Alerts.notifyUser("BadCrypto")
            })
    }
}