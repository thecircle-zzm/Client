import { Injectable } from "@angular/core";
import { AlertService } from './alert.service';

@Injectable()
export class CertificateService {
    crypto = window.crypto;

    constructor(private Alerts:AlertService) {}

    private convertStringToArrayBufferView(str)
    {
        var bytes = new Uint8Array(str.length);
        for (var iii = 0; iii < str.length; iii++)
        {
            bytes[iii] = str.charCodeAt(iii);
        }

        return bytes;
    }   

    createCertificate() {
        let promiseKey:PromiseLike<CryptoKeyPair> = null;
        
        if(this.crypto.subtle){
            return crypto.subtle.generateKey({name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: {name: "SHA-256"}}, false, ["sign", "verify"]);
        } else {
            console.log("NoCrypto")
            this.Alerts.notifyUser("NoCrypto")
            return null;
        }
    }

    encrypt(data: string, key){
        return this.crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, this.convertStringToArrayBufferView(data));
    }

    verifySignature(data: string, publicKey, signature){
        return crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, signature, this.convertStringToArrayBufferView(data));
    }

    exportKey(key){
        return crypto.subtle.exportKey("jwk", key)
    }

    importKey(key){
        let text = "MIIEpAIBAAKCAQEAyddGEqwEE6B6IeoJFB5ZQs9IEfhkk7YWZjUgzTdG6qA3zgw7\n7K/HjdOmxD5zRrj7oQag0PJFre3hHMWxzOMpjlk//eCWnZVK2Bde59hrpeHLTy0t\nqORvEmX0ZN795iocJ7NafnjWcHUdwY04Ibh3W3U4oT9G1LRQYOXfVkdznbe+FTMz\nSpwRlkkBZT4VDo3safjVkwNjrDeow8Q78zwjTqXzDSduEjoJGUR9lOKTFmuIKIGF\n4SqyppBeOodgXmluJmA5eFxyyZZ67jG4ilN5UsL8pf1oSdYNJhsuaydrSZDXQKaE\nuXUixajOFilUua7y2aQMXLSqSA4nDg7BJhpFmwIDAQABAoIBACfodqRueofe7QcT\nnSPrND7veRKEiG5kTF19F7U7vrvZXe9Rn++WeeBi/tBCgMx0+tvF0bo+jORs6luk\nAxm9uJO6tdpes6kIwbmkNVGmCvLLiEVpa2O/du6uVfoz1QPTQ6nd3oCvJ8cogO+q\nGnUgYgklTkMjnb+kv1fJW7VVf1iph8u9i3hauz4IQxzp1jXbJPqYjoX5vFgKZvN1\nT28wREMxaS2LNWPA2e0Y5qoYpnVBQsyUuHW+6ps6SV4BOgocJwMCnu9hQ5k1jTvl\nnOkyvzWUwC50g51hv0o+NqhvIPsiZsQWX2mMKoezV8AqZsb6K7+xhX8rHj8pyXhk\nibyukVECgYEA8jG0/1Z58D7Z1JaO4gHp+sSAfhAShBeEIPb1BBK1sV/K6jAU3zgQ\nQkDqGrexvawyTphKNI67o08Awhhvic9tdEUCjUELOS32GsTjZrb0cpeEuhlA3Ktm\nqtUnxn7DAi/Wy09k5pibnhWOx1l+VkLnAMFLJpS7gVwQO1bnR8HlczUCgYEA1Viz\nC+PjybAwSdNeGRiL3U18RV1mLdHP4XTFXLFQXRTLOO5fCQtuI6kUfmJmcNurN3jp\n0EQGL/nwUv1+NqpczGsSzEzO2s8CW3hkjJB70pu2lFsYaPf7hVMD537obr7cWGOV\nE9ZCQ4jocwKkI8ad2cw4tglkuUtLeIiby7X9n48CgYEAnDt8aoo6NsQUeJJ2sUxS\nxzUjPi7YAuW4khs8itgW5MjKeK9zh1r/Af4mBf4hZh1ChniuxaCdYgeAkbR5nwhz\nruEleEFRIB2J+FKx7nxuy8z6DaJkuPTIUcMW2XDEExERGi2pBSfEmwGFDQup97NI\nmLAX7ldbbWMaBW1V3HAzt1ECgYB0GWDWB53eE9MzWaLLZWA3fgMyfDEung7SUglU\n9+kTvk0ZHh75fQ7iuRA99q5onCIAffw/KcV0Nj9h6jDU7sCxPVNteh7XU++kd0/A\nbp/zbGlfMnOGK+zkENj/EUDLg3HFZ+uob+B/f/F/JODN1zfvXgM+jL4TV7YqUaz2\nnoL2YQKBgQCI3eUbwi1m+c72hgDt/ikRXo+M7FIaocqblARXSj41bW+W5ly6yD9e\npa5TvRS0qd7n8IQgXJ6hn+KsHFejDC2JZnXcRiGWY1FGG1FQlkd+yUx4msNwx8SD\n3KvwdtqtytjkvpsQ2JNmJrRf8fIEC34rgTBo1nub8wUPHi3ln87Rng=="
        console.log(text)
        return crypto.subtle.importKey("spki", this.convertStringToArrayBufferView(text.replace("/\r?\n|\r/g","\\")),{name:"RSASSA-PKCS1-v1_5", hash: {name: "SHA-256"}}, true, ["sign"])
    }
}